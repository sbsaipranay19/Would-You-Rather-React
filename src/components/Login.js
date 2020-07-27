import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {


    handleLogin = (e) => {
        e.preventDefault()

        const selectedUser = document.getElementById("curr_user").value
        const { dispatch } = this.props
        dispatch(setAuthedUser(selectedUser))
    }

    render() {
        const { users } = this.props
        return (
            <form className="loginForm" onSubmit={this.handleLogin}>
                <h3 className="loginHeading">Select a user</h3>
                <select name="currUser" key="curr_user" id="curr_user">
                {Object.values(users).map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
                </select>
                <br />
                <button
                    className="btn"
                    type='submit'>
                    Login
                </button>
            </form>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users,
  }
}


export default withRouter(connect(mapStateToProps)(Login))
