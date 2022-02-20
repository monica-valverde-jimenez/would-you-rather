import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from 'classnames';
import './Home.css';
import Card from '../Card/Card';
import Question from '../Question/Question';

class Home extends Component {
  state = {
    currectTab: 0,
  }

  onClickTab = (event) => {
    const index = parseInt(event?.currentTarget.getAttribute('data-index'), 10);
    this.setState({ currectTab: index});
  }

  renderQuestions = () => {
    const { users, questionList, userUnAnswered, userAnswered} = this.props;
    const questionsToDisplay = this.state.currectTab === 0 ? userUnAnswered : userAnswered;
    return (
      <div>
        {
          questionsToDisplay.map(index => {
           const data = questionList[index];
           const author = users[data.author];
            return (
              <Card
                key={data.id}
                name={author.name}
                avatarURL={author.avatarURL}>
                  <Question
                    question={data.optionOne.text}
                    onClick={this.onQuestionClick}
                    idQuestion={data.id}
                  />
              </Card>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className='home-wrapper'>
        <div className='home-tabs'>
          <div className={classes('home-tab', {
            'home-tab--active': this.state.currectTab === 0,
          })}
            data-index="0"
            onClick={this.onClickTab}
          >
            Unanswered Questions
          </div>
          <div className={classes('home-tab', {
            'home-tab--active': this.state.currectTab === 1,
          })}
            data-index="1"
            onClick={this.onClickTab}
          >
            Answered Questions
          </div>
        </div>
        <div className='home-questions'>
          {this.renderQuestions()}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const questionList =state?.questions || {};
  const userAnswered = Object.keys(state?.authUser?.answers || {}) || [];
  userAnswered.sort((a,b) => questionList[b].timestamp - questionList[a].timestamp);
  const questions = Object.keys(questionList) || [];
  const userUnAnswered = questions.filter(question => !userAnswered.includes(question));
  userUnAnswered.sort((a,b) => questionList[b].timestamp - questionList[a].timestamp);
  return {
    userAnswered,
    userUnAnswered,
    questionList,
    users: state.users || [],
  };
}

export default connect(mapStateToProps)(Home);