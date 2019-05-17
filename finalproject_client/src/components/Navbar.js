import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

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
                                (token !== '') ? null : (
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
                                        <NavLink to="/" style={{ color: 'black' }} onClick={() => {
                                            this.props.logout()
                                            const Toast = Swal.mixin({
                                                toast: true,
                                                position: 'bottom-end',
                                                showConfirmButton: false,
                                                timer: 3000
                                            });
                                            Toast.fire({
                                                type: 'success',
                                                title: 'Bye!'
                                            })
                                        }}>Logout</NavLink>
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