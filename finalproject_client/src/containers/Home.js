import React, { Component } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import M from 'materialize-css'
import Trailer from '../assets/trailer.mp4'

export default class Home extends Component {
    componentDidMount() {
        var modal = document.querySelectorAll('.modal');
        M.Modal.init(modal)
        if (localStorage.getItem('token')) {
            this.props.history.push('/Game')
        }
    }

    render() {
        return (
            <>
                <div style={{
                    minWidth: '99%'
                }}>
                    <video width="100%" autoPlay loop>
                        <source src={Trailer} type="video/mp4" />
                    </video>
                </div>
                <Register {...this.props} />
                <Login {...this.props} />
            </>
        )
    }
}
