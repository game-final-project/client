import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav style={{ backgroundColor: 'gold' }}>
                <div className="nav-wrapper">
                    <NavLink to="/" style={{ color: 'black' }} className="brand-logo center">Bomb's Away <span role="img" aria-label="bomb">💣</span></NavLink>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li>
                            <a className="modal-trigger" data-target="registerModal" style={{ color: 'black' }}>Register</a>
                        </li>
                        <li>
                            <a className="modal-trigger" data-target="loginModal" style={{ color: 'black' }}>Login</a>
                        </li>
                        <li><a href="collapsible.html" style={{ color: 'black' }}>Leaderboard</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)