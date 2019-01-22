import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { MdThumbUp } from "react-icons/md";

class UnansweredQuestion extends Component {
  state = {
    toHome: false,
    answer: ""
  };
  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, id } = this.props;
    const answer = this.state.answer;
    if (answer !== "") {
      dispatch(handleAnswerQuestion(id, answer));
    }
    this.setState(() => ({
      toHome: true
    }));
  };
  handleChange = value => {
    this.setState(() => ({
      answer: value
    }));
  };
  isDisabled = () => {
    return this.state.answer === "";
  };
  render() {
    const { optionOne, optionTwo, timestamp } = this.props.question;
    const { name, avatarURL } = this.props.author;
    const { toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="poll card">
        <div className="poll-container">
          <img src={avatarURL} alt={`avatar of ${name}`} className="avatar" />
          <div className="poll-info">
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </div>
        </div>
        <h4>Would you rather...</h4>
        <form className="unanswered-poll questions" onSubmit={this.handleSubmit}>
          <label className="question-option">
            <input
              type="radio"
              value="optionOne"
              name="answer"
              onClick={() => this.handleChange("optionOne")}
            />{optionOne.text}
          </label>
          <label className="question-option">
            <input
              type="radio"
              value="optionTwo"
              name="answer"
              onClick={() => this.handleChange("optionTwo")}
            />{optionTwo.text}
          </label>

          <button
            color="primary"
            variant="contained"
            type="submit"
            className="btn-submit question-btn"
            disabled={this.isDisabled()}
          >
          <MdThumbUp className="more-icon"/>
            <span>Vote</span>
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  return {
    question,
    author: users[question.author]
  };
}
export default connect(mapStateToProps)(UnansweredQuestion);
