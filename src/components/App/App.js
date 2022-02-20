import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../../actions/shared';
import { setAuthedUser } from '../../actions/authUser';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import Signin from '../Signin/Signin';
import Poll from '../Poll/Poll';
import newQuestion from '../newQuestion/newQuestion';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import PageNotFound from '../PageNotFound/PageNotFound';
import getMenuLinks from '../../utils/getMenuLinks';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  onLogout = () => {
    const user = {};
    user.isAuthenticated = false;
    this.props.dispatch(setAuthedUser(user));
  }

  render() {
    const { loading, isAuthenticated, authUser } = this.props;
    const menu = getMenuLinks();
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Navigation isAuthenticated={isAuthenticated} user={authUser} onLogout={this.onLogout}/>
          <div className='container'>
            {(!isAuthenticated || !loading) && (
              <div>
                <Switch>
                  <Route exact path={menu.home} component={isAuthenticated ? Home : Signin} />
                  <Route path={menu.newQuestion} component={isAuthenticated ? newQuestion : Signin} />
                  <Route path={menu.leaderBoard} component={isAuthenticated ? LeaderBoard : Signin} />
                  <Route path={menu.poll} component={isAuthenticated ? Poll : Signin} />
                  <Route component={isAuthenticated ? PageNotFound : Signin} />
                </Switch>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isAuthenticated: state.authUser?.isAuthenticated || false,
    authUser: state.authUser || {},
    loading: state.authUser === null,
  }
}

export default connect(mapStateToProps)(App)