import React, { Component } from "react";
import { connect } from "react-redux";

class UserStats extends Component {
  render() {
    const { user } = this.props;
    const { name, avatarURL, answers, questions } = user;

    return (
      <div className="card">
          <img className='avatar' alt={name} src={avatarURL} />
          <p>
            <span className='name'>{name}</span> <br />
            Answered Questions: {Object.keys(answers).length} <br />
            Created Questions: {questions.length} <br />
          </p>
          <div className='score'>
            Score: {Object.keys(answers).length + questions.length}
          </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id]
  };
}

export default connect(mapStateToProps)(UserStats);
