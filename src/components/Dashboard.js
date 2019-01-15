import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Dashboard extends Component {
  state = {
    value: 0
  }
  handleChange = (event, value) => {
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <h3>Questions</h3>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Unanswered" />
          <Tab label="Answered" />
        </Tabs>
        {value === 1 && (
          <ul>
            {this.props.answeredIds.map(id => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}
        {value === 0 && (
          <ul>
            {this.props.unansweredIds.map(id => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    answeredIds: Object.keys(questions)
      .filter(id => users[authedUser].answers.hasOwnProperty(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unansweredIds: Object.keys(questions)
      .filter(id => !users[authedUser].answers.hasOwnProperty(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard);
