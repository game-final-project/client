import React, { Component } from 'react'
import 'p5/lib/addons/p5.sound'
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as speechCommands from '@tensorflow-models/speech-commands'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './gameboard/js/main'
import M from 'materialize-css'
import Tutorial from '../components/Tutorial'
import { connect } from 'react-redux'
import HowToPlay from '../components/HowToPlay'
import Loading from '../assets/loading.gif'

class Game extends Component {
    state = {
        direction: '',
        accuracy: '',
        up: false,
        right: false,
        down: false,
        left: false,
        ready: false,
        life: 3,
        // AUDIO TESTING
        recognizer: speechCommands.create('BROWSER_FFT', 'directional4w'),
        prediction: '',
        // AUDIO TESTING
        webcamLoading: true,
        show: 'none'
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/')
        } else {
            var slider = document.querySelectorAll('.slider');
            M.Slider.init(slider, {
                indicators: false,
                interval: 3000
            });
            var modal = document.querySelectorAll('.modal');
            M.Modal.init(modal)
            this.app();
        }
    }

    app = async () => {
        // AUDIO TESTING
        console.log('Loading audio predictor...')
        const { recognizer } = this.state
        await recognizer.ensureModelLoaded();
        this.predictWord();
        console.log('Successfully loaded audio predictor')
        // AUDIO TESTING

        const classifier = knnClassifier.create();
        const webcamElement = document.getElementById('webcam');
        let net;
        console.log('Loading mobilenet..');

        // Load the model.
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');

        await this.setupWebcam();
        this.setState({
            webcamLoading: false,
            show: 'inline'
        })
        // Reads an image from the webcam and associates it with a specific class
        // index.
        const addExample = classId => {
            // Get the intermediate activation of MobileNet 'conv_preds' and pass that
            // to the KNN classifier.
            const activation = net.infer(webcamElement, 'conv_preds');

            // Pass the intermediate activation to the classifier.
            classifier.addExample(activation, classId);
        };

        // When clicking a button, add an example for that class.
        let upButton = document.getElementById('class-a')
        let rightButton = document.getElementById('class-b')
        let downButton = document.getElementById('class-c')
        let leftButton = document.getElementById('class-d')

        if (upButton) upButton.addEventListener('click', () => addExample(0));
        if (rightButton) rightButton.addEventListener('click', () => addExample(1));
        if (downButton) downButton.addEventListener('click', () => addExample(2));
        if (leftButton) leftButton.addEventListener('click', () => addExample(3));

        while (true) {
            if (classifier.getNumClasses() > 0) {
                // Get the activation from mobilenet from the webcam.
                const activation = net.infer(webcamElement, 'conv_preds');
                // Get the most likely class and confidences from the classifier module.
                const result = await classifier.predictClass(activation);

                const classes = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
                this.setState({
                    direction: classes[result.classIndex],
                    accuracy: result.confidences[result.classIndex]
                }, () => {
                    if (classes[result.classIndex] === 'UP' && result.confidences[result.classIndex] === 1) {
                        this.setState({
                            up: true
                        })
                    } else if (classes[result.classIndex] === 'RIGHT' && result.confidences[result.classIndex] === 1) {
                        this.setState({
                            right: true
                        })
                    } else if (classes[result.classIndex] === 'DOWN' && result.confidences[result.classIndex] === 1) {
                        this.setState({
                            down: true
                        })
                    } else if (classes[result.classIndex] === 'LEFT' && result.confidences[result.classIndex] === 1) {
                        this.setState({
                            left: true
                        })
                    }
                })
            }
            await tf.nextFrame();
        }
    }

    // AUDIO TESTING
    predictWord = () => {
        const { recognizer } = this.state
        // Array of words that the recognizer is trained to recognize.
        const words = recognizer.wordLabels();
        recognizer.listen(({ scores }) => {
            // Turn scores into a list of (score,word) pairs.
            scores = Array.from(scores).map((s, i) => ({ score: s, word: words[i] }));
            // Find the most probable word.
            scores.sort((s1, s2) => s2.score - s1.score);
            console.log(scores[0].word.toUpperCase(), '=== PREDICTION')
            this.setState({
                prediction: scores[0].word.toUpperCase()
            })
        }, { probabilityThreshold: 0.99 });
    }
    // AUDIO TESTING

    setupWebcam = async () => {
        const webcamElement = document.getElementById('webcam');
        if (webcamElement) {
            return new Promise((resolve, reject) => {
                const navigatorAny = navigator;
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
                    navigatorAny.msGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({ video: true },
                        stream => {
                            webcamElement.srcObject = stream;
                            webcamElement.addEventListener('loadeddata', () => resolve(), false);
                        },
                        error => reject());
                    this.setState({
                        webcamLoading: true
                    })
                } else {
                    reject();
                }
            });
        }
    }

    render() {
        const { direction, ready, up, right, down, left, life, accuracy, prediction, show } = this.state
        const { replace } = this.props.history
        const { users } = this.props
        return (
            <>
                <HowToPlay />
                <Tutorial />
                <div className="row">
                    <div style={{ marginTop: '15px' }} className="col">
                        <P5Wrapper users={users} replace={replace} life={life} direction={direction} sketch={sketch} ready={ready} prediction={prediction} resetState={() => this.setState({ prediction: 'DOWN' })} />
                        {
                            (left && !ready) ? (
                                <a href="_blank" onClick={(event) => {
                                    event.preventDefault()
                                    this.setState({
                                        ready: true
                                    })
                                }} className="waves-teal btn">PLAY!</a>
                            ) : (
                                    <a href="_blank" disabled className="waves-effect waves-teal btn">PLAY!</a>
                                )
                        }
                        <a style={{ marginLeft: '5px' }} id="tutor_button" href="_blank" data-target="howToPlayModal" className="modal-trigger waves-effect black btn">HOW TO PLAY</a>
                    </div>
                    <div className="col">
                        <h4>Direction: <span style={{ color: 'gold' }}>{direction}</span></h4>
                        <h4>Accuracy: <span style={{ color: 'gold' }}>{Number(accuracy).toFixed(2)}</span></h4>
                        {/* AUDIO TESTING */}
                        <h4>Prediction: <span style={{ color: 'gold' }}>{(prediction === 'UP') ? (JSON.stringify(true)) : (JSON.stringify(false))}</span></h4>
                        {/* AUDIO TESTING */}
                        <div style={{width: "237px", height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {
                                (this.state.webcamLoading) && (
                                    <img width="137" height="100" src={Loading} alt="loading" />
                                )
                            }
                            <video style={{ display: show }} autoPlay playsInline muted id="webcam" width="237" height="200"></video>
                        </div>
                        <br />
                        <a href="_blank" onClick={(event) => event.preventDefault()} id="class-a" className="waves-effect waves-teal btn">UP</a>
                        {
                            (up) ? (
                                <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-b" className="waves-effect waves-teal btn">RIGHT</a>
                            ) : (
                                    <a href="_blank" disabled style={{ marginLeft: '5px' }} id="class-b" className="waves-effect waves-teal btn">RIGHT</a>
                                )
                        }

                        {
                            (right) ? (
                                <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-c" className="waves-effect waves-teal btn">DOWN</a>
                            ) : (
                                    <a href="_blank" disabled style={{ marginLeft: '5px' }} id="class-c" className="waves-effect waves-teal btn">DOWN</a>
                                )
                        }

                        {
                            (down) ? (
                                <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-d" className="waves-effect waves-teal btn">LEFT</a>
                            ) : (
                                    <a href="_blank" disabled style={{ marginLeft: '5px' }} id="class-d" className="waves-effect waves-teal btn">LEFT</a>
                                )
                        }
                        <br />
                        <a style={{ marginTop: '5px' }} id="tutor_button" href="_blank" data-target="tutorialModal" className="modal-trigger waves-effect black btn">HOW TO TRAIN</a>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state
    }
}


export default connect(mapStateToProps, null)(Game)

