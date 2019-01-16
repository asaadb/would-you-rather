import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

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
    const { optionOne, optionTwo } = this.props.question;
    const { toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="unanswered">
        <form className="unanswered-poll" onSubmit={this.handleSubmit}>
          <h3>Would you rather...</h3>
          <label>
            <input
              type="radio"
              value="optionOne"
              name="answer"
              onClick={() => this.handleChange("optionOne")}
            />{" "}
            {optionOne.text}
            <br />
          </label>
          <label>
            <input
              type="radio"
              value="optionTwo"
              name="answer"
              onClick={() => this.handleChange("optionTwo")}
            />{" "}
            {optionTwo.text}
            <br />
          </label>

          <button
            color="primary"
            variant="contained"
            type="submit"
            className="btn-submit"
            disabled={this.isDisabled()}
          >
            Vote
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
