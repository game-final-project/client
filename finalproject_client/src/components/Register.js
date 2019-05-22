import React, { Component } from 'react'
import { register } from '../store/actions/userActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Register extends Component {
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
        const { username, email, password } = this.state
        event.preventDefault()
        this.props.register(username, email, password, this.props)
    }

    render() {
        const { username, email, password } = this.state

        // if(this.props.token) {
        //     this.props.history.push('/Game');
        // }

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
                                <a href="_blank" className="modal-trigger modal-close btn" data-target="loginModal" style={{ marginLeft: '8px' }}>Login</a>
                            </h6>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {
                                (
                                    username !== '' &&
                                    username !== ' ' &&
                                    email !== '' &&
                                    email !== ' ' &&
                                    password !== '' &&
                                    password !== ' '
                                ) ? (
                                        <button className="modal-close btn waves-effect waves-light" type="submit" name="action">Submit
                                            <i className="material-icons right">send</i>
                                        </button>
                                    ) : (
                                        <button disabled className="btn waves-effect waves-light" type="submit" name="action">Submit
                                            <i className="material-icons right">send</i>
                                        </button>
                                    )
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        register: (username, email, password, props) => {
            dispatch(register({ username, email, password, props }))
        }
    })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
