import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { formatQuestion } from '../utils/helpers'
import Answer from './Answer'
import Result from './Result'

class QuestionPage extends Component {
  render() {
      const { question } = this.props
    return (
        <Fragment>
        { question ? (question.hasVoted ?
            (
                <Result id={question.id} />
            ) :
            (
                <Answer id={question.id} />
            )) :
            (
                <div>Not Found</div>
            )
        }
        </Fragment>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
    const { question_id } = props.match.params
    const question = questions[question_id]

    return {
      authedUser,
      question: question
        ? formatQuestion(question, users[question.author], users[authedUser])
        : null
    }
}

export default connect(mapStateToProps)(QuestionPage)
