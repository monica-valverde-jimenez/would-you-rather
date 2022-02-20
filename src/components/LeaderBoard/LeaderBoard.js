import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LeaderBoard.css';
import Card from '../Card/Card';

class LeaderBoard extends Component {

  renderPollResult = () => {
    const { cardInfo={} } = this.props;
    return (
      <Card
        key={cardInfo.id}
        avatarURL={cardInfo.avatarURL}>
        <div className="LeaderBoard-wrapper">
          LeaderBoard
        </div>
      </Card>
    );
  }

  render() {
    return (
      <div className='leaderboard-wrapper'>
        {this.props.leaderBoard.map(user => (
          <Card
            key={user.id}
            avatarURL={user.avatarURL}>
            <div className="leaderboard-inner">
              <div className="leaderboard-panel">
                <h2>{user.name}</h2>
                <div className="leaderboard-results">
                  <div className="leaderboard-label">Answered questions</div>
                  <div className="leaderboard-result">{user.totalAnswers}</div>
                </div>
                <div className="leaderboard-results">
                  <div className="leaderboard-label">Created questions</div>
                  <div className="leaderboard-result">{user.totalQuestion}</div>
                </div>
              </div>
              <div className="leaderboard-panel">
                <div className="leaderboard-square">
                  <div className="leaderboard-score">Score</div>
                  <div className="leaderboard-badge">{user.score}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const data = Object.keys(state.users).map(id => {
    const user = state.users[id];
    const totalQuestion = user.questions.length;
    const totalAnswers = Object.keys(user.answers).length;
    const score = totalQuestion + totalAnswers;
    return {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      totalQuestion,
      totalAnswers,
      score
    }
  });
  const leaderBoard = data.sort((item, itemC) => itemC.score - item.score);
  return {
    leaderBoard
  };
}

export default connect(mapStateToProps)(LeaderBoard);