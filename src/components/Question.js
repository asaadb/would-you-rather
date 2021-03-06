import React from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const Question = props => {
  const { question, user } = props;
  const { timestamp, optionOne, optionTwo, id } = question;
  const { name, avatarURL } = user;
  return (
    <div className="poll">
      <div className="poll-container">
        <img src={avatarURL} alt={`avatar of ${name}`} className="avatar" />
        <div className="poll-info">
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
        </div>
      </div>
      <h4>Would you rather...</h4>
      <div className="questions">
        <p className="question-option">{optionOne.text}</p>
        <p className="question-option">{optionTwo.text}</p>
      </div>
      <Link to={`/questions/${id}`} className="question-btn">
        <MdAdd className="more-icon" />
        <span>View</span>
      </Link>
    </div>
  );
};

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question,
    user: users[question.author]
  };
}

export default connect(mapStateToProps)(Question);
