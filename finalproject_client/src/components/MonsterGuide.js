import React, { Component } from 'react'
import gameGuide from '../assets/tutorial/gameguide.png'

export default class HowToPlay extends Component {
    render() {
        return (
            <div id="monsterGuideModal" className="modal">
                <div className="slider">
                    <ul className="slides">
                        <li>
                            <img alt="howtoplay" src={gameGuide}  />
                        </li>
                    </ul>
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#282c34', display: 'flex', justifyContent: 'flex-end' }}>
                    <a href="_blank" style={{ color: 'white' }} onClick={(event) => event.preventDefault()} className="modal-close waves-effect waves-green btn">Got it!</a>
                </div>
            </div>
        )
    }
}
