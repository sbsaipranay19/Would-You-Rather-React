import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { formatQuestion } from '../utils/helpers'

class Question extends Component {
  handleVote = (e) => {
    e.preventDefault()

    // todo: Handle Like Tweet
  }
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't existd</p>
    }

    const {
      name, avatar, id, optionOne
  } = question

    return (
      <Link to={`/questions/${id}`} className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>Would you rather...</span>
            <p>{optionOne.text}...</p>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], users[authedUser])
      : null
  }
}

export default connect(mapStateToProps)(Question)
