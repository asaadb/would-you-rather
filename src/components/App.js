import React, { Component, Fragment } from "react";
import "../App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import NewPoll from "./NewPoll";
import Nav from "./Nav";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/new" exact component={NewPoll} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}
export default connect(mapStateToProps)(App);
