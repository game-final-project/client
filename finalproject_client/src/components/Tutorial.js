import React, { Component } from 'react'
import Up from '../assets/tutorial/up.jpg'
import Right from '../assets/tutorial/right.jpg'
import Down from '../assets/tutorial/down.jpg'
import Left from '../assets/tutorial/left.jpg'

export default class Tutorial extends Component {
    render() {
        return (
            <div id="tutorialModal" className="modal">
                <div className="slider">
                    <ul className="slides">
                        <li>
                            <img alt="tutorial" src={Up} />
                            <div className="caption left-align">
                                <h6 style={{ color: 'black' }} >Example for "Shoot" Command</h6>
                            </div>
                        </li>
                        <li>
                            <img alt="tutorial" src={Right} />
                            <div className="caption left-align">
                                <h6 style={{ color: 'black' }} >Example for "Move Right" Command</h6>
                            </div>
                        </li>
                        <li>
                            <img alt="tutorial" src={Down} />
                            <div className="caption left-align">
                                <h6 style={{ color: 'black' }} >Example for "Idle" Command</h6>
                            </div>
                        </li>
                        <li>
                            <img alt="tutorial" src={Left} />
                            <div className="caption left-align">
                                <h6 style={{ color: 'black' }} >Example for "Move Left" Command</h6>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#282c34' }}>
                    <a href="_blank" style={{ color: 'white' }} onClick={(event) => event.preventDefault()} className="modal-close waves-effect waves-green btn-flat">Skip</a>
                </div>
            </div>
        )
    }
}
