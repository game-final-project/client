import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class endGame extends Component {
  state = {
    userData: [{
      name: 'Alvin',
      score: 90
    },{
      name: 'Rubi',
      score: 50
    },{
      name: 'Eltim',
      score: 70
    }]
  }
  
  componentDidMount() {
    console.log('hola')
  }
  
  
  render() {
    const { userData } = this.state
    // console.log(userData)
    const dataList = userData.length ? (
      <table className="highlight" style={{background: 'yellow', margin: '1', color: 'black'}}>
          <thead>
            <tr>
                <th>Name</th>
                <th>Score </th>
            </tr>
          </thead>
          <tbody>
          {
            userData.map((user,index) => {
              return (
                <tr>
                  <td> {user.name }</td>
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
        {/* <Link to="/Game" className="waves-effect waves-light btn" style={{color: 'black', position: 'absolute'}}>PLAY AGAIN </Link> */}
        {/* <Link to="/" className="waves-effect waves-light btn" style={{color: 'black', position: 'absolute'}}> HOME </Link> */}
        
        {dataList}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'space-evenly',
        marginTop: '20px'
      }}>

        <Link to="/" className="waves-effect waves-light btn" style={{marginRight: '10px'}}>Play Again </Link>
        <Link to="/" className="waves-effect waves-light btn"> Back to Home </Link>
      </div>
      
      </>
    )
  }
}
