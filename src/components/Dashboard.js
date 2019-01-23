import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { MdDone, MdInfoOutline } from "react-icons/md";

const styles = {
  tabs: {
    flexGrow: 1,
    width: "100%",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  tab: {
    fontSize: "0.9rem"
  },
  icons: {
    fontSize: "1.4rem"
  }
};

class Dashboard extends Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.tabs}
        >
          <Tab
            label="Unanswered"
            className={classes.tab}
            icon={<MdInfoOutline className={classes.icons} />}
          />
          <Tab
            label="Answered"
            className={classes.tab}
            icon={<MdDone className={classes.icons} />}
          />
        </Tabs>
        {value === 1 && (
          <ul className="cards">
            {this.props.answeredIds.map(id => (
              <li className="card" key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}
        {value === 0 && (
          <ul className="cards">
            {this.props.unansweredIds.map(id => (
              <li className="card" key={id}>
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
  };
}
export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
