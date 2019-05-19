import React, { Component } from 'react'
import 'p5/lib/addons/p5.sound'
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import P5Wrapper from 'react-p5-wrapper'
import sketch from './gameboard/js/main'
import M from 'materialize-css'
import Tutorial from '../components/Tutorial'
import { connect } from 'react-redux'

class Game extends Component {
    state = {
        direction: '',
        accuracy: '',
        up: false,
        right: false,
        down: false,
        left: false,
        ready: false,
        life: 3
    }

    componentDidMount() {
        var slider = document.querySelectorAll('.slider');
        M.Slider.init(slider, {
            indicators: false,
            interval: 3000
        });
        var modal = document.querySelectorAll('.modal');
        M.Modal.init(modal)
        this.app();
    }

    app = async () => {
        const classifier = knnClassifier.create();
        const webcamElement = document.getElementById('webcam');
        let net;
        console.log('Loading mobilenet..');

        // Load the model.
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');

        await this.setupWebcam();

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
        document.getElementById('class-a').addEventListener('click', () => addExample(0));
        document.getElementById('class-b').addEventListener('click', () => addExample(1));
        document.getElementById('class-c').addEventListener('click', () => addExample(2));
        document.getElementById('class-d').addEventListener('click', () => addExample(3));

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

    setupWebcam = async () => {
        const webcamElement = document.getElementById('webcam');
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
            } else {
                reject();
            }
        });
    }

    render() {
        const { direction, ready, up, right, down, left, life } = this.state
        const { replace } = this.props.history
        const { users } = this.props
        return (
            <>
                <Tutorial />
                <div className="row">
                    <div style={{ marginTop: '15px' }} className="col">
                        <P5Wrapper users={users} replace={replace} life={life} direction={direction} sketch={sketch} ready={ready} />
                        {
                            (up && right && down && left) ? (
                                <a href="_blank" onClick={(event) => {
                                    event.preventDefault()
                                    this.setState({
                                        ready: true
                                    })
                                }} className="waves-effect waves-teal btn">READY</a>
                            ) : (
                                    <a href="_blank" disabled className="waves-effect waves-teal btn">READY</a>
                                )
                        }
                        <a style={{ marginLeft: '5px' }} id="tutor_button" href="_blank" data-target="tutorialModal" className="modal-trigger waves-effect waves-teal btn">TUTORIAL</a>
                    </div>
                    <div className="col">
                        <h6>Direction: <span style={{ color: 'gold' }}>{this.state.direction}</span></h6>
                        <h6>Accuracy: <span style={{ color: 'gold' }}>{this.state.accuracy}</span></h6>
                        <video autoPlay playsInline muted id="webcam" width="200" height="200"></video>
                        <br />
                        <a href="_blank" onClick={(event) => event.preventDefault()} id="class-a" className="waves-effect waves-teal btn">UP</a>
                        {
                            (this.state.up) ? (
                                <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-b" className="waves-effect waves-teal btn">RIGHT</a>
                            ) : (
                                    <a href="_blank" disabled style={{ marginLeft: '5px' }} id="class-b" className="waves-effect waves-teal btn">RIGHT</a>
                                )
                        }

                        {
                            (this.state.right) ? (
                                <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-c" className="waves-effect waves-teal btn">DOWN</a>
                            ) : (
                                    <a href="_blank" disabled style={{ marginLeft: '5px' }} id="class-c" className="waves-effect waves-teal btn">DOWN</a>
                                )
                        }

                        {
                            (this.state.down) ? (
                                <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-d" className="waves-effect waves-teal btn">LEFT</a>
                            ) : (
                                    <a href="_blank" disabled style={{ marginLeft: '5px' }} id="class-d" className="waves-effect waves-teal btn">LEFT</a>
                                )
                        }
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

