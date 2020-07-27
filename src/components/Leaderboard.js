import React, { Component } from 'react'
import { connect } from 'react-redux'
import Leader from './Leader'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>Leaderboard</h3>
        <ul className="leaderBoard">
            {this.props.leaders.map((leader) => (
              <Leader key={leader} id={leader} />
            ))}
          </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser, users }) {
  return {
    users,
    leaders: Object.keys(users)
        .sort((a,b) => (
            (users[b].questions.length + Object.keys(users[b].answers).length) -
            (users[a].questions.length + Object.keys(users[a].answers).length))),
  }
}

export default connect(mapStateToProps)(Dashboard)
