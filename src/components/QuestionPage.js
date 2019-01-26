import React from "react";
import { connect } from "react-redux";
import UnansweredQuestion from "./UnansweredQuestion";
import AnsweredQuestion from "./AnsweredQuestion";

const QuestionPage = props => {
    const { authedUserAnswers } = props;
    const { id } = props.match.params;
    const answered = authedUserAnswers.hasOwnProperty(id);
    if (answered) {
      return <AnsweredQuestion id={id} />;
    } else {
      return <UnansweredQuestion id={id} />;
    }
  }

function mapStateToProps({ authedUser, users }) {
  const authedUserAnswers = users[authedUser].answers;
  return {
    authedUserAnswers
  };
}
export default connect(mapStateToProps)(QuestionPage);
