import React, { Component } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import M from 'materialize-css'

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
                <iframe src="https://www.youtube.com/embed/p4juj4NR3KA?autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&playlist=p4juj4NR3KA" allow="autoplay" frameborder="0" height='700px' width='100%' />
                <Register {...this.props} />
                <Login {...this.props} />
            </>
        )
    }
}
