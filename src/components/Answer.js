import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAddAnswer } from '../actions/questions'
import { withRouter } from 'react-router-dom'

class Answer extends Component {
  state = {
    answer: '',
    enableSubmit: false
  }
  handleAnswer = (e) => {
    const answer = e.target.value

    this.setState((state) => ({
      answer,
      enableSubmit: true
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { answer } = this.state
    const { dispatch, id } = this.props


    dispatch(handleAddAnswer(id, answer))

    this.setState(() => ({
      answer: '',
      enableSubmit: false
    }))
  }
  render() {
    const { enableSubmit } = this.state
    const { question } = this.props

    const {
      name, avatar, optionOne, optionTwo
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
            <h3 className='center'>Would You Rather...</h3>
            <form className='answer' onSubmit={this.handleSubmit}>
              <input
               type="radio"
               placeholder="I would rather..."
               value="optionOne"
               name="answer"
               onChange={this.handleAnswer}
               className='radio'
              /> {optionOne.text} <br />
              <input
               type="radio"
               placeholder="I would rather..."
               value="optionTwo"
               name="answer"
               onChange={this.handleAnswer}
               className='radio'
              /> {optionTwo.text} <br />
              <button
               className='btn'
               type='submit'
               disabled={!enableSubmit}>
                 Submit
              </button>
            </form>
          </div>
        </div>
     </div>
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

export default withRouter(connect(mapStateToProps)(Answer))
