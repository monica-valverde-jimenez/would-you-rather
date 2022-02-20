import React, { Component } from 'react';
import { connect } from 'react-redux';
import './newQuestion.css';

import { saveNewQuestion } from '../../actions/questions';

class newQuestion extends Component {
  state= {
    isReady: false,
    questionOne: '',
    questionTwo: ''
  }
  onClick = () => {
    const { questionOne, questionTwo } = this.state;
    this.props.dispatch(saveNewQuestion(questionOne, questionTwo));
    this.props.history.push('/')
  }

  handleChangeOptionOne = (e) => {
    const questionOne = e.target.value;

    this.setState((prevState) => ({
      questionOne,
      isReady: prevState.questionTwo.length > 0 && questionOne.length > 0
    }))
  }

  handleChangeOptionTwo = (e) => {
    const questionTwo = e.target.value

    this.setState(prevState => ({
      questionTwo,
      isReady: prevState.questionOne.length > 0 && questionTwo.length > 0
    }))
  }

  render() {
    return (
      <div className='new-question-wrapper'>
        <div className='new-question-inner'>
          <div className='new-question-header'>Create New Question</div>
          <div className='new-question-label'>Complete the question:</div>
          <div className='new-question-title'>Would you rather..</div>
          <form>
            <div className='new-question-input'><input type="text" name="questionOne" placeholder="Enter question one text" onChange={this.handleChangeOptionOne}></input></div>
            <span>Or</span>
            <div className='new-question-input'><input type="text" name="questionTwo" placeholder="Enter question two text" onChange={this.handleChangeOptionTwo}></input></div>
            <button type='button' onClick={this.onClick} disabled={!this.state.isReady}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    history: ownProps.history,
  };
}

export default connect(mapStateToProps)(newQuestion);