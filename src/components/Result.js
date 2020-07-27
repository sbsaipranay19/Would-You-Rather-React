import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'


class Result extends Component {
  render() {
    const { question } = this.props
    const {
      name, avatar, optionOne, optionTwo, currentUserVote,
      optionOneVotes, optionTwoVotes, totalVotes
    } = question

    return (
        <div className='question'>
          <img
            src={avatar}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
          <div className='question-info'>
            <div>
              <span>Would you rather...</span>
              <p>{currentUserVote === 'optionOne' ? (<span className="active">{optionOne.text} (voted by {name})</span>) : optionOne.text }
              ... {`Percentage of Votes ${(optionOneVotes/totalVotes) * 100}% (${optionOneVotes} votes)`}</p>
              <p>{currentUserVote === 'optionTwo' ? (<span className="active">{optionTwo.text} (voted)</span>) : optionTwo.text }
              ... {`Percentage of Votes ${(optionTwoVotes/totalVotes) * 100}% (${optionTwoVotes} votes)`}</p>
              <p>Total: {totalVotes}</p>
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, { id }) {
  const question = questions[id]

  return {
      question: question
        ? formatQuestion(question, users[question.author], users[authedUser])
        : null
  }
}

export default connect(mapStateToProps)(Result)
