import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import { CircleMeter } from "react-svg-meters";
import { FaRegCheckCircle } from "react-icons/fa";

class AnsweredQuestion extends Component {
  render() {
    const { question, user, authedUser } = this.props;
    const { timestamp, optionOne, optionTwo } = question;
    const { name, avatarURL } = user;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    return (
      <div className="answered card">
        <div className="poll-container">
          <img src={avatarURL} alt={`avatar of ${name}`} className="avatar" />
          <div className="poll-info">
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </div>
        </div>
        <ul className="results-container">
          <li className="result-item">
            <div className="circle-meter">
              <CircleMeter
                value={Math.round((optionOne.votes.length / totalVotes) * 100)}
                size={110}
              />
              {optionOne.votes.includes(authedUser) ? (
                <span className="check-circle" style={{ color: "red" }}>
                  {" "}
                  <FaRegCheckCircle /> You
                </span>
              ) : null}
            </div>
            <p>{optionOne.text}</p>
            <em>{`Votes: ${optionOne.votes.length}`}</em>
          </li>
          <li className="result-item">
            <div className="circle-meter">
              <CircleMeter
                value={Math.round((optionTwo.votes.length / totalVotes) * 100)}
                size={110}
              />
              {optionTwo.votes.includes(authedUser) ? (
                <span className="check-circle" style={{ color: "red" }}>
                  {" "}
                  <FaRegCheckCircle /> You
                </span>
              ) : null}
            </div>
            <p>{optionTwo.text}</p>
            <em>{`Votes: ${optionTwo.votes.length}`}</em>
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
