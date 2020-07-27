import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

class Nav extends Component {

  handleLogout = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(setAuthedUser(''))
    this.props.history.push('/')
  }
  render() {
      const { users, authedUser } = this.props
      return (
        <nav className='nav'>
          <ul>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active'>
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' activeClassName='active'>
                Leader Board
              </NavLink>
            </li>
            {
                authedUser ? (
                    <li className="floatLeft">
                      <button  className="navBox" onClick={this.handleLogout}>
                        Hello {users[authedUser].name}
                        <img className="avatar" src={users[authedUser].avatarURL} alt={`Avatar of ${users[authedUser].name}`}/>
                        Logout
                      </button>
                    </li>
                ) : (
                    <li>
                      <NavLink to='/login' activeClassName='active'>
                        Login
                      </NavLink>
                    </li>
                )
            }
          </ul>
        </nav>
      )
  }

}

function mapStateToProps ({ users, authedUser }) {
  return {
    authedUser,
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Nav))
