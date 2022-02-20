import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import './Signin.css';
import { setAuthedUser } from '../../actions/authUser';

class Signin extends Component {
  state = {
    selectedUser: null,
  };

  onClick = () => {
    if (!this.state.selectedUser) return;
    const { users } = this.props;
    const user = users[this.state.selectedUser];
    user.isAuthenticated = true;
    this.props.dispatch(setAuthedUser(user));
  }

  handleChangeUser = event => {
    const inputValue = get(event, ['target', 'value']);
    const userId = inputValue !== 'default' ? inputValue : null;
    this.setState({ selectedUser: userId });
  }

  render() {
    const { users } = this.props;
    return (
      <div className='signin-wrapper'>
        <div className='signin-inner'>
          <div className='signin-Header'>
            <h1>Welcome to the Would Your Rather App!</h1>
            <span>Please signin to continue</span>
          </div>
          <div className='signin-content'>
            <div className='signin-logo'><img src="/images/login.svg" alt="Login"/></div>
            <div className='signin-form'>
              <div className='signin-label'>Sign In</div>
              <div>
                <select className='signin-select' onChange={this.handleChangeUser}>
                  <option key="default" value="default">
                    Select one...
                  </option>
                  {Object.keys(users).map((index) => (
                    <option key={users[index].id} value={users[index].id}>
                      {users[index].name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='signin-button-container'>
                <button
                  className='signin-button'
                  type='button'
                  onClick={this.onClick}
                  disabled={!this.state.selectedUser}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
};

const mapStateToProps = (state) => ({
  users: state?.users || {},
});

export default connect(mapStateToProps)(Signin);