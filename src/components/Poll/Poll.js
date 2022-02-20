import React, { Component } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty'
import classes from 'classnames';
import { connect } from 'react-redux';
import './Poll.css';
import Card from '../Card/Card';

import { saveUserAnswer } from '../../actions/questions';

class Poll extends Component {

  state = {
    currentAnwer: 'optionOne',
  }

  componentDidMount() {
    if (!this.props.question) {
      this.props.history.push('/404');
    }
  }

  onSubmitVote = () => {
    const { dispatch, currentUser, question} = this.props;
    dispatch(saveUserAnswer({ authedUser: currentUser.id, qid:question.id, answer:this.state.currentAnwer }));
  }

  onChangeValue = (event) => {
     this.setState({
      currentAnwer: event.target.value
    })
  }

  renderPollResult = () => {
    const { question, cardInfo, currentUser } = this.props;
    const votesOpt1 = question.optionOne.votes.length;
    const votesOpt2 = question.optionTwo.votes.length;
    const totalVotes = votesOpt1 + votesOpt2;
    const votesPerc1 = (100 * votesOpt1) / totalVotes;
    const votesPerc2 = (100 * votesOpt2) / totalVotes;
    const userVote = currentUser.answers[question.id];
    return (
      <Card
        key={cardInfo.id}
        name={cardInfo.name}
        avatarURL={cardInfo.avatarURL}>
        <div className="poll-description">
          <h2>Results:</h2>
          <div className={classes('poll-result', {
            'poll-result--voted': userVote === 'optionOne'
          })}>
            {userVote === 'optionOne' && (<div className="poll-badge">Your vote</div>)}
            <div className='poll-question'>Would you rather {question.optionOne.text}</div>
            <div className='poll-bar'><span style={{ width: `${votesPerc1}%` }}/></div>
            <div className='poll-votes'>{votesOpt1} out of {totalVotes} votes</div>
          </div>
          <div className={classes('poll-result', {
            'poll-result--voted': userVote === 'optionTwo'
          })}>
            {userVote === 'optionTwo' && (<div className="poll-badge">Your vote</div>)}
            <div className='poll-question'>Would you rather {question.optionTwo.text}</div>
            <div className='poll-bar'><span style={{ width: `${votesPerc2}%` }}/></div>
            <div className='poll-votes'>{votesOpt2} out of {totalVotes} votes</div>
          </div>
        </div>
      </Card>
    );
  }

  renderVoteSubmit = () => {
    const { question, cardInfo } = this.props;
    return question && (
      <Card
        key={cardInfo.id}
        name={cardInfo.name}
        avatarURL={cardInfo.avatarURL}>
          <div className="poll-description">
            <h2>Would You Rather</h2>
            <div className="poll-option">
              <input type="radio" id="question1" name="poll" value="optionOne" checked={this.state.currentAnwer === "optionOne"} onChange={this.onChangeValue} />
              <label htmlFor="question1">{question.optionOne.text}</label>
            </div>
            <div className="poll-option">
              <input type="radio" id="question2" name="poll" value="optionTwo" checked={this.state.currentAnwer === "optionTwo"} onChange={this.onChangeValue} />
              <label htmlFor="question2">{question.optionTwo.text}</label>
            </div>
            <button onClick={this.onSubmitVote}>Submit</button>
          </div>
      </Card>
    );
  }

  render() {
    return (
      <div className='poll-wrapper'>
        {this.props.isNewVote && this.renderVoteSubmit()}
        {!this.props.isNewVote && this.renderPollResult()}
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const idQuestion = get(ownProps, ['location', 'pathname'], '').split('/').slice(-1)[0];
  const question = (state?.questions || {})[idQuestion];
  const currentUser = state?.authUser || {};
  return {
    isNewVote: isEmpty(currentUser.answers[idQuestion]),
    question,
    cardInfo: (question && state?.users[question.author]) || {},
    currentUser
  };
}

export default connect(mapStateToProps)(Poll);