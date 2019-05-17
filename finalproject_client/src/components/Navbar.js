import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {
    render() {
        const { token } = this.props
        return (
            <div className="navbar-fixed">
                <nav style={{ backgroundColor: 'gold' }}>
                    <div className="nav-wrapper">
                        <NavLink to="/" style={{ color: 'black' }} className="brand-logo center">Bomb's Away <span role="img" aria-label="bomb">💣</span></NavLink>
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            {
                                (token !== '') ? (
                                    <li>
                                        <NavLink to="/WebcamTest" style={{ color: 'black' }}>Webcam (TEST)</NavLink>
                                    </li>
                                ) : (
                                        <>
                                            <li>
                                                <a href="_blank" className="modal-trigger" data-target="registerModal" style={{ color: 'black' }}>Register</a>
                                            </li>
                                            <li>
                                                <a href="_blank" className="modal-trigger" data-target="loginModal" style={{ color: 'black' }}>Login</a>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {
                                (token !== '') && (
                                    <li>
                                        <a href="_blank" onClick={(event) => {
                                            event.preventDefault()
                                            this.props.logout()
                                        }} style={{ color: 'black' }}>Logout</a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navbar)