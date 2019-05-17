import React, { Component } from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import M from 'materialize-css'

export default class Home extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems)
    }

    render() {
        return (
            <>
                <div>
                    <img alt="bomb gif" style={{ height: '200%', width: '200%' }} src="https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif" />
                </div>
                <Register {...this.props} />
                <Login {...this.props} />
            </>
        )
    }
}
