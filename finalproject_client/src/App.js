import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// LIST OF PAGES
import Home from './containers/Home'
import Game from './containers/Game'
import AboutUs from './containers/AboutUs'
import Leaderboard from './containers/Leaderboard'
import NotFound from './containers/NotFound'

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
              <Route exact path="/AboutUs" component={AboutUs} />
              <Route exact path="/Leaderboard" component={Leaderboard} />
              <Route component={NotFound} />
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
