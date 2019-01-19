import React, { Component } from "react";
import "../App.css";
import {  Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewPoll from "./NewPoll";
import Nav from "./Nav";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";

class PrivateApp extends Component {
  render() {
    return (
          <div>
            <Nav />
            {this.props.loading === true ? null : (
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/new" exact component={NewPoll} />
                <Route path="/question/:id" exact component={QuestionPage} />
                <Route path="/leaderboard" exact component={LeaderBoard} />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
    );
  }
}

export default PrivateApp
