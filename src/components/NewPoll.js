import React, { Component } from "react";
import { handleAddQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { MdSend, MdModeEdit } from "react-icons/md";

class NewPoll extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const question = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(question));
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: true
    }));
  };
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="new-poll card">
        <div className="card-header">
          <MdModeEdit className="header-icon" />
          <h3>Create a new poll</h3>
        </div>
        <h4>Would you rather...</h4>
        <form className="new-poll-form" onSubmit={this.handleSubmit}>
          <label htmlFor="first-option-input" className="input-label">
            First Option:
          </label>
          <input
            id="first-option-input"
            type="text"
            placeholder="Enter First Option"
            value={optionOneText}
            className="question-option"
            onChange={this.handleChange("optionOneText")}
          />
          <label htmlFor="second-option-input" className="input-label">
            Second Option:
          </label>
          <input
            id="second-option-input"
            type="text"
            placeholder="Enter Second Option"
            value={optionTwoText}
            className="question-option"
            onChange={this.handleChange("optionTwoText")}
          />
          <button
            disabled={optionOneText === "" || optionTwoText === ""}
            color="primary"
            variant="contained"
            type="submit"
            className="question-btn"
          >
            <MdSend className="more-icon" />
            <span>Submit</span>
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewPoll);
