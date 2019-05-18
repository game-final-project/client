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
                <div class="carousel carousel-slider center">
                    <div class="carousel-fixed-item center">
                        <a class="btn waves-effect white grey-text darken-text-2">button</a>
                    </div>
                    <div class="carousel-item red white-text" href="#one!">
                        <h2>First Panel</h2>
                        <p class="white-text">This is your first panel</p>
                    </div>
                    <div class="carousel-item amber white-text" href="#two!">
                        <h2>Second Panel</h2>
                        <p class="white-text">This is your second panel</p>
                    </div>
                    <div class="carousel-item green white-text" href="#three!">
                        <h2>Third Panel</h2>
                        <p class="white-text">This is your third panel</p>
                    </div>
                    <div class="carousel-item blue white-text" href="#four!">
                        <h2>Fourth Panel</h2>
                        <p class="white-text">This is your fourth panel</p>
                    </div>
                </div>
                <Register {...this.props} />
                <Login {...this.props} />
            </>
        )
    }
}
