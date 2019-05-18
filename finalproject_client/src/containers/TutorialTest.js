import React, { Component } from 'react'
import Tutorial from '../components/Tutorial'
import M from 'materialize-css'

export default class TutorialTest extends Component {
    componentDidMount() {
        var slider = document.querySelectorAll('.slider');
        M.Slider.init(slider, {
            indicators: false,
            interval: 3000
        });
        var modal = document.querySelectorAll('.modal');
        M.Modal.init(modal)
    }

    render() {
        return (
            <>
                <Tutorial />
            </>
        )
    }
}
