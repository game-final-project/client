import React, { Component } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import M from 'materialize-css'
import Trailer from '../assets/trailer.mp4'

export default class Home extends Component {
    componentDidMount() {
        var modal = document.querySelectorAll('.modal');
        M.Modal.init(modal)

        var carousel = document.querySelectorAll('.carousel');
        M.Carousel.init(carousel, {
            fullWidth: true,
            indicators: true
        });
    }

    render() {
        return (
            <>
                <div style={{
                    minWidth: '100%'
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
