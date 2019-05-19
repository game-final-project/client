import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getPlayers } from '../store/actions/userActions'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  componentDidMount() {
    this.props.getPlayers()
  }

  render() {
    const { allPlayer } = this.props

    const dataList = allPlayer.length ? (
      <table className="highlight" style={{ background: 'gold', margin: '1', borderRadius: '10px', color: 'black' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score </th>
          </tr>
        </thead>
        <tbody>
          {
            allPlayer.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td> {user.username}</td>
                  <td> {user.score} </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    ) : (<p>No Post Yet</p>)
    return (
      <>
        <div style={{
          display: 'flex',
          flexDirection: 'space-evenly'
        }}>
          {dataList}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'space-evenly',
          marginTop: '20px'
        }}>
          {
            localStorage.getItem('token') &&
            <Link to="/Game" className="waves-effect waves-light btn">Play Again </Link>
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
