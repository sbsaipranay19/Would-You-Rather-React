import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { withRouter } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  }
  handleOptionOne = (e) => {
    const optionOne = e.target.value

    this.setState((state) => ({
      ...state,
      optionOne
    }))
  }
  handleOptionTwo = (e) => {
    const optionTwo = e.target.value

    this.setState((state) => ({
      ...state,
      optionTwo
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
    }))
    this.props.history.push('/')
  }
  render() {
    const { optionOne, optionTwo } = this.state


    return (
      <div className="newQuestion">
        <h3 className='center'>Would You Rather...</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="I would rather..."
            value={optionOne}
            onChange={this.handleOptionOne}
            className='textarea'
          />
          <textarea
            placeholder="Or..."
            value={optionTwo}
            onChange={this.handleOptionTwo}
            className='textarea'
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect()(NewQuestion))
