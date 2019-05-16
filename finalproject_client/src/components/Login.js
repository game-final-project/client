import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div id="loginModal" className="modal">
                <div className="modal-content">
                    <h4 style={{ color: 'black' }}>Login</h4>
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate" onChange={this.handleChange} />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate" onChange={this.handleChange} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div>
                            <h6 style={{ color: 'black' }}>
                               Not a member yet?
                                <a className="modal-trigger modal-close btn" data-target="registerModal" style={{ marginLeft: '8px' }}>Register</a>
                            </h6>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
