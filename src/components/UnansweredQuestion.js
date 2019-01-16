import React, { Component } from 'react';
import { connect } from 'react-redux'

class UnansweredQuestion extends Component {
  handleSubmit = (event) => {
    event.preventDefault()

  }
  render() {
    const { optionOne, optionTwo } = this.props.question
    return (
      <div className="unanswered">
      <form className="unanswered-poll" onSubmit={this.handleSubmit}>
        <input type="radio" value='optionOne' name="answer" /> {optionOne.text}<br />
        <input type="radio" value='optionTwo' name="answer" /> {optionTwo.text}<br />
        <button
          color="primary"
          variant="contained"
          type="submit"
          className='btn-submit'
        >
        Submit
        </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps ({ questions, users }, {id}) {
  const question = questions[id]
  return {
    question,
    author: users[question.author],
  }
}
export default connect(mapStateToProps)(UnansweredQuestion);
