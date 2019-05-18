import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getPlayers } from '../store/actions/userActions'
import { connect } from 'react-redux'

class endGame extends Component {
  componentDidMount() {
    this.props.getPlayers()
  }

  render() {
    const { allPlayer } = this.props
    
    const dataList = allPlayer.length ? (
      <table className="highlight" style={{ background: 'yellow', margin: '1', color: 'black' }}>
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

        {/* <img src="https://media.giphy.com/media/DQvjBK1KtWLUQ/giphy.gif" style={{ height: '100%', minWidth: '100%', position: 'fixed' }} alt="kingdom"  /> */}
        {/* <h3 style={{color: 'black', position: 'absolute'}}>Halo </h3> */}
        <div style={{
          display: 'flex',
          flexDirection: 'space-evenly'
        }}>
          {/* <Link to="/WebcamTest" className="waves-effect waves-light btn" style={{color: 'black', position: 'absolute'}}>PLAY AGAIN </Link> */}
          {/* <Link to="/" className="waves-effect waves-light btn" style={{color: 'black', position: 'absolute'}}> HOME </Link> */}

          {dataList}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'space-evenly',
          marginTop: '20px'
        }}>

          <Link to="/" className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>Play Again </Link>
          <Link to="/" className="waves-effect waves-light btn"> Back to Home </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(endGame);
