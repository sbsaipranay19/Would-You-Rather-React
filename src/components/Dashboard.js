import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Your Questions</h3>
        <Tabs defaultActiveKey="unanswered" id="questions">
          <Tab eventKey="unanswered" title="Unanswered Questions">
              <ul className='Unaswered-Questions'>
                {this.props.unansweredQuestionIds.map((id) => (
                  <li key={id}>
                    <Question id={id} />
                  </li>
                ))}
              </ul>
          </Tab>
          <Tab eventKey="answered" title="Answered Questions">
              <ul className='Anwered-Questions'>
                {this.props.answeredQuestionIds.map((id) => (
                  <li key={id}>
                    <Question id={id} />
                  </li>
                ))}
              </ul>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function getUnansweredQuestions(questions, user) {
    return Object.keys(questions).filter(
        questionId => !user.answers[questionId]
    )
}

function getAnsweredQuestions(questions, user) {
    return Object.keys(questions).filter(
        questionId => user.answers[questionId]
    )
}

function mapStateToProps ({ questions, authedUser, users }) {
  return {
    unansweredQuestionIds: getUnansweredQuestions(questions, users[authedUser])
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestionIds: getAnsweredQuestions(questions, users[authedUser])
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(Dashboard)
