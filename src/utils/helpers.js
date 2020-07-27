export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    hasVoted: authedUser.answers.hasOwnProperty(id),
    currentUserVote: authedUser.answers[id],
    optionOneVotes: optionOne.votes.length,
    optionTwoVotes: optionTwo.votes.length,
    avatar: avatarURL,
    totalVotes: optionOne.votes.length + optionTwo.votes.length
  }
}

export function formatUser (user) {
  const { id, name, answers, questions, avatarURL } = user

  return {
    name,
    id,
    answers,
    questions,
    answerCount: Object.keys(answers).length,
    questionCount: questions.length,
    total: Object.keys(answers).length + questions.length,
    avatar: avatarURL,
  }
}
