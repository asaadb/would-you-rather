import React, { Component } from "react";
import { connect } from "react-redux";
import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";

class QuestionPage extends Component {
  render() {
    const { authedUserAnswers } = this.props;
    const id = this.props.match.params.id;
    const answered = authedUserAnswers.hasOwnProperty(id);
    if (answered) {
      return <AnsweredQuestion id={id} />;
    } else {
      return <UnansweredQuestion id={id} />;
    }
  }
}

function mapStateToProps({ authedUser, users }) {
  const authedUserAnswers = users[authedUser].answers;
  return {
    authedUserAnswers
  };
}
export default connect(mapStateToProps)(QuestionPage);
