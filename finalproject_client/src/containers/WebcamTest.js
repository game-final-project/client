import React, { Component } from 'react'
import '../../node_modules/p5/lib/addons/p5.sound'
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import P5Wrapper from 'react-p5-wrapper'
import sketch from './gameboard/js/main'


export default class WebcamTest extends Component {
    state = {
        direction: '',
        accuracy: '',
        up: false,
        right: false,
        down: false,
        left: false,
        ready: false
    }

    componentDidMount() {
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
                    if (classes[result.classIndex] === 'UP') {
                        this.setState({
                            up: true
                        })
                    } else if (classes[result.classIndex] === 'RIGHT') {
                        this.setState({
                            right: true
                        })
                    } else if (classes[result.classIndex] === 'DOWN') {
                        this.setState({
                            down: true
                        })
                    } else if (classes[result.classIndex] === 'LEFT') {
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
        const { direction, ready, up, right, down, left } = this.state
        const { replace } = this.props.history
        return (
            <div className="row">
                <div style={{ marginTop: '15px' }} className="col">
                    <P5Wrapper replace={replace} direction={direction} sketch={sketch} ready={ready} />
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
                </div>
                <div className="col">
                    <h6>{this.state.direction}</h6>
                    <h6>{this.state.accuracy}</h6>
                    <video autoPlay playsInline muted id="webcam" width="200" height="200"></video>
                    <br />
                    <a href="_blank" onClick={(event) => event.preventDefault()} id="class-a" className="waves-effect waves-teal btn">UP</a>
                    <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-b" className="waves-effect waves-teal btn">RIGHT</a>
                    <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-c" className="waves-effect waves-teal btn">DOWN</a>
                    <a href="_blank" style={{ marginLeft: '5px' }} onClick={(event) => event.preventDefault()} id="class-d" className="waves-effect waves-teal btn">LEFT</a>
                </div>
                <br />
            </div>
        )
    }
}
