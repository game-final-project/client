import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// LIST OF PAGES
import Home from './containers/Home'
import Game from './containers/Game'
import EndGame from './containers/EndGame'
import AboutUs from './containers/AboutUs'

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.verify()
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar {...this.props} logout={() => this.props.logout()} />
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Game" component={Game} />
              <Route exact path="/Endgame" component={EndGame} />
              <Route exact path="/aboutus" component={AboutUs} />
            </Switch>
          </header>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    verify: () => {
      dispatch({
        type: 'VERIFY',
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        username: localStorage.getItem('username'),
        id: localStorage.getItem('id'),
        token: localStorage.getItem('token')
      })
    },
    logout: () => {
      dispatch({
        type: 'LOGOUT'
      })
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
