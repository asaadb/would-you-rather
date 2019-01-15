import React, { Component } from "react";

class NewPoll extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  };
  handleSubmit = event => {
    event.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    // TODO:  Add questions to the store
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: ""
    }));
  };
  render() {
    const { optionOneText, optionTwoText } = this.state;
    return (
      <div>
        <h3 className="center">Create a new poll</h3>
        <form className="new-poll" onSubmit={this.handleSubmit}>
          <input
            placeholder="First option"
            value={optionOneText}
            onChange={this.handleChange('optionOneText')}
          />
          <input
            placeholder="Second option"
            value={optionTwoText}
            onChange={this.handleChange('optionTwoText')}
          />
          <button
            disabled={optionOneText === '' || optionTwoText === ''}
            color="primary"
            variant="contained"
            type="submit"
            className='btn-submit'
          >
          Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewPoll;
