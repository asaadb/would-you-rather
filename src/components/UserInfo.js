import React from "react";
import { connect } from "react-redux";

const UserInfo = props => {
  const { user } = props;
  const { name, avatarURL, answers, questions } = user;
  return (
    <div className="card leaderboard-card">
      <img className="avatar" alt={name} src={avatarURL} />
      <div>
        <h6 className="name">{name}</h6>
        <p className="question-option">
          Answered Questions: <b>{Object.keys(answers).length}</b>
        </p>
        <p className="question-option">
          Created Questions: <b>{questions.length} </b>
        </p>
      </div>
      <div className="score">
        <p>Score</p>
        <span> {Object.keys(answers).length + questions.length}</span>
      </div>
    </div>
  );
};

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id]
  };
}

export default connect(mapStateToProps)(UserInfo);
