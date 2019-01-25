import React, { Component, Fragment } from "react";
import "../App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewPoll from "./NewPoll";
import Nav from "./Nav";
import QuestionPage from "./QuestionPage";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {authedUser && <Nav />}
          <div className="App">
            {this.props.loading === true ? null : (
              <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/home" exact component={Dashboard} />
                <PrivateRoute
                  path="/questions/:id"
                  exact
                  component={QuestionPage}
                />
                <PrivateRoute path="/add" exact component={NewPoll} />
                <PrivateRoute
                  path="/leaderboard"
                  exact
                  component={LeaderBoard}
                />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    loading: !users === null
  };
}
export default connect(mapStateToProps)(App);
