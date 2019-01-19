import React, { Component, Fragment } from "react";
import "../App.css";
import { BrowserRouter as Router} from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import PrivateApp from "./PrivateApp";
import Login from "./Login";

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
            {this.props.loading === true ? null : (
              <div>
              { !this.props.authedUser
							? <Login />
							: <PrivateApp />
						}
            </div>
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
