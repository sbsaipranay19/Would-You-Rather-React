import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import Login from './Login'

class Home extends Component {
  render() {
    const { authedUser } = this.props
    console.log('authed', authedUser)
    return (
      <Fragment>
        {
            authedUser ? (
                <Dashboard />
            ) : (
                <Login />
            )
        }
      </Fragment>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(Home)
