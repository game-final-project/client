import React, { Component } from 'react'
import Up from '../assets/tutorial/up.png'
import Right from '../assets/tutorial/right.png'
import Down from '../assets/tutorial/down.png'
import Left from '../assets/tutorial/left.png'

export default class Tutorial extends Component {
    render() {
        return (
            <div id="tutorialModal" className="modal">
                <div className="slider">
                    <ul className="slides">
                        <li>
                            <img alt="tutorial" src={Up} />
                        </li>
                        <li>
                            <img alt="tutorial" src={Right} />
                        </li>
                        <li>
                            <img alt="tutorial" src={Down} />
                        </li>
                        <li>
                            <img alt="tutorial" src={Left} />
                        </li>
                    </ul>
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#282c34', display: 'flex', justifyContent: 'space-between' }}>
                    <h6 style={{ color: 'gold' }}>Please train each direction until accuracy is equal to 1!</h6>
                    <a href="_blank" style={{ color: 'white' }} onClick={(event) => event.preventDefault()} className="modal-close waves-effect waves-green btn">Got it!</a>
                </div>
            </div>
        )
    }
}
