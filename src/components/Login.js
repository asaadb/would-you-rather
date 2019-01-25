import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MdPerson } from "react-icons/md";
import { isAuth } from "../utils/api";
import { Redirect } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#605052"
  },
  grow: {
    flexGrow: 1,
    fontSize: "1.5rem"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Login extends Component {
  state = {
    authedUser: "",
    imgSrc: "/favicon.ico",
    redirectToReferrer: false
  };
  
  handleSubmit = event => {
    event.preventDefault();
    const { authedUser } = this.state;
    const { dispatch } = this.props;
    isAuth.authenticate(() => {
      dispatch(setAuthedUser(authedUser));
      this.setState({ redirectToReferrer: true });
    });
  };
  handleSelect = e => {
    const val = e.target.value;
    const img = this.props.users[val].avatarURL;
    this.setState(() => ({
      authedUser: val,
      imgSrc: img
    }));
  };
  const;
  render() {
    const { redirectToReferrer } = this.state;
    const { users, ids, classes } = this.props;
    if (redirectToReferrer === true) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <div className={classes.root}>
          <AppBar className={classes.appBar} position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Would You Rather ?
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <main className="login card">
          <div className="card-header">
            <MdPerson className="header-icon" />
            <h3>Sign In</h3>
          </div>
          <form onSubmit={this.handleSubmit} className="login-form">
            <img src={this.state.imgSrc} alt="avatar" className="avatar" />
            <select onChange={this.handleSelect}>
              <option hidden value="default">
                Select a user...
              </option>
              {ids.map(id => (
                <option value={users[id].id} key={users[id].id}>
                  {users[id].name}
                </option>
              ))}
            </select>
            <button
              disabled={this.state.authedUser === ""}
              className="question-btn sign-in"
            >
              <span>Sign In</span>
            </button>
          </form>
        </main>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
    ids: Object.keys(users)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Login));
