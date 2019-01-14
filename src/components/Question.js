import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
class Question extends Component {
  render() {

    const { question, user } = this.props
     // console.log('Question: ', question);
     // console.log('User: ', user);
    const { timestamp, optionOne, optionTwo, id } = question
    const { name, avatarURL } = user
    console.log('author: ',name)
    console.log('timestamp: ',timestamp)
    console.log('optionOne: ',optionOne)
    console.log('optionTwo: ', optionTwo)
    console.log('avatar: ', avatarURL)
    console.log('id: ', id)
    return (
      <div className='poll'>
        <div className='poll-container'>
          <img
            src={avatarURL}
            alt={`avatar of ${name}`}
            className='avatar'
          />
          <div className='poll-info'>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </div>
        </div>
        <p className='questions'> "{optionOne.text}"
          <br/>
          or
          <br/>
           "{optionTwo.text}"
        </p>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users,  questions }, {id}) {
  const question = questions[id]
  return {
    authedUser,
    question: question,
    user: users[question.author]
  }
}

export default connect(mapStateToProps)(Question)
