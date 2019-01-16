import React, { Component } from "react";
import { connect } from "react-redux";

class AnsweredQuestion extends Component {
  render() {
    return (
      <div className="Answered">
        {`AnsweredQuestionId: ${this.props.question.id}`}
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  return {
    question,
    author: question
  };
}

export default connect(mapStateToProps)(AnsweredQuestion);
