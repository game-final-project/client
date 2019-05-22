import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getPlayers } from '../store/actions/userActions'
import { connect } from 'react-redux'
import Register from '../components/Register'
import Login from '../components/Login'
import M from 'materialize-css'
import { relative } from 'path';
import Background from '../assets/leaderboardBG.gif'

class Leaderboard extends Component {
  componentDidMount() {
    this.props.getPlayers()
    var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal)
  }

  render() {
    const { allPlayer } = this.props

    const dataList = allPlayer.length ? (
      <table className="responsive-table highlight" style={{ color: 'black' }}>
        <thead style={{ background: 'gold' }}>
          <tr>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Score</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'whitesmoke' }}>
          {
            allPlayer.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td style={{ textAlign: 'center' }}>{user.username}</td>
                  <td style={{ textAlign: 'center' }}>{user.score}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    ) : (<p>No Post Yet</p>)
    return (
      <>
        <div>
          <img src={Background} alt="background" width="100%" style={{ position: relative }} />
        </div>
        <Register {...this.props} />
        <Login {...this.props} />
        <div style={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '60%' }}>
          <div style={{ minWidth: '70%' }}>
            <h5 style={{ color: 'whitesmoke' }}>Top 5 Players</h5>
            {dataList}
          </div>
          {
            localStorage.getItem('token') && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Your current high score: <span style={{ color: 'black' }}>{localStorage.getItem('score')}</span> </h5>
                <Link to="/Game" style={{ marginLeft: '15px', marginTop: '12px' }} className="pulse waves-effect waves-light btn">Play Again </Link>
              </div>
            )
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    allPlayer: state.allPlayer
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getPlayers: () => {
      dispatch(getPlayers())
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
