import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// LIST OF PAGES
import Home from './containers/Home'

// MODALS
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={Home} />

          </Switch>
          <Register />
          <Login />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
