import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class NewPoll extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  };
  handleSubmit = event => {
    event.preventDefault();
    const question = this.state;
    const { dispatch } = this.props
    dispatch(handleAddQuestion(question))
    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    }));
  };
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    if (toHome === true) {
      return <Redirect to='/' />
    }
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

export default connect() (NewPoll);
