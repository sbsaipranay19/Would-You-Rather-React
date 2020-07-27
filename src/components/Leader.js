import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'

import { formatUser } from '../utils/helpers'

class Leader extends Component {

  render() {
    const { user } = this.props

    if (user === null) {
      return <p>No users</p>
    }

    const {
      name, avatar, answerCount, questionCount, total
  } = user

    return (
      <Card>
        <Card.Header>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        /> {name}
        </Card.Header>
        <Card.Body>
          <div>
            <span>Number of Questions Asked</span>
            <p>{questionCount}</p>
            <span>Number of Questions Answered</span>
            <p>{answerCount}</p>
            <span>Points in Total</span>
            <p>{total}</p>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ users }, { id }) {
  const user = users[id]

  return {
    user: user
      ? formatUser(user)
      : null
  }
}

export default connect(mapStateToProps)(Leader)
