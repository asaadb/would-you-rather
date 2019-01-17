import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { CircleMeter } from 'react-svg-meters';
import { FaRegCheckCircle } from "react-icons/fa";

class AnsweredQuestion extends Component {
  render() {
    const { question, user, authedUser } = this.props;
    const { timestamp, optionOne, optionTwo } = question;
    const { name, avatarURL } = user;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    return (
      <div className="Answered">
        <div className="poll-container">
          <img src={avatarURL} alt={`avatar of ${name}`} className="avatar" />
          <div className="poll-info">
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </div>
        </div>
        <ul>
          <li>
            <CircleMeter value={Math.round((optionOne.votes.length / totalVotes) * 100)} size={100} />
            {optionOne.votes.includes(authedUser) ? (
              <span style={{ color: "red" }}> <FaRegCheckCircle/> You</span>
            ) : null}
            <p>{optionOne.text}</p>
            <span>{`Votes ${optionOne.votes.length}`}</span>
          </li>
          <li>
            <CircleMeter value={Math.round((optionTwo.votes.length / totalVotes) * 100)} size={100} />
            {optionTwo.votes.includes(authedUser) ? (
              <span style={{ color: "red" }}> <FaRegCheckCircle/> You</span>
            ) : null}
            <p>{optionTwo.text}</p>
            <span>{`Votes ${optionTwo.votes.length}`}</span>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question,
    user: users[question.author]
  };
}

export default connect(mapStateToProps)(AnsweredQuestion);
