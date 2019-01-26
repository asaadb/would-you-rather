import React from "react";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";

const LeaderBoard = props => {
  return (
    <div>
      <h2>Leader Board</h2>
      <div className="leaderboard cards">
        {props.sortedIds.map(id => (
          <UserInfo key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

function mapStateToProps({ users }) {
  const sortedIds = Object.keys(users).sort((a, b) => {
    const answersA = users[a].answers;
    const answersB = users[b].answers;
    const scoreA = Object.keys(answersA).length + users[a].questions.length;
    const scoreB = Object.keys(answersB).length + users[b].questions.length;
    return scoreB - scoreA;
  });
  return {
    sortedIds
  };
}

export default connect(mapStateToProps)(LeaderBoard);
