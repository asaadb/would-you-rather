import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser'
class Login extends Component {
  state = {
    authedUser: ''
  };
  handleSubmit = event => {
    event.preventDefault();
    const { authedUser } = this.state;
    const { dispatch } = this.props
    dispatch(setAuthedUser(authedUser))
  };
  handleSelect = (e) => {
    const val = e.target.value
    this.setState(() => ({
      authedUser: val
    }))
  }
  render() {
    const { users, ids } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <span>Select a user</span>
        <form onSubmit={this.handleSubmit}>
          <select placeholder='Select' onChange={this.handleSelect}>
            {ids.map(id => (
              <option value={users[id].id} key={users[id].id}>
                {users[id].name}
              </option>
            ))}
          </select>
          <button>
          Go
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
    ids:Object.keys(users)
  };
}

export default connect(mapStateToProps)(Login);
