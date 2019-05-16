import React, { Component } from 'react'

export default class Register extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div id="registerModal" className="modal">
                <div className="modal-content">
                    <h4 style={{ color: 'black' }}>Register</h4>
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="usernameRegister" name="username" type="text" className="validate" onChange={this.handleChange} />
                                <label htmlFor="usernameRegister">Username</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="emailRegister" name="email" type="email" className="validate" onChange={this.handleChange} />
                                <label htmlFor="emailRegister">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="passwordRegister" name="password" type="password" className="validate" onChange={this.handleChange} />
                                <label htmlFor="passwordRegister">Password</label>
                            </div>
                        </div>
                        <div>
                            <h6 style={{ color: 'black' }}>
                                Already have an account?
                                <a className="modal-trigger modal-close btn" data-target="loginModal" style={{ marginLeft: '8px' }}>Login</a>
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
