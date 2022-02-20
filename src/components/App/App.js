import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../../actions/shared';
import { setAuthedUser } from '../../actions/authUser';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import Poll from '../Poll/Poll';
import newQuestion from '../newQuestion/newQuestion';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
            {(!loading) && (
              <div>
                <Switch>
                  <ProtectedRoute exact path={menu.home} component={Home} />
                  <ProtectedRoute path={menu.newQuestion} component={newQuestion} />
                  <ProtectedRoute path={menu.leaderBoard} component={LeaderBoard} />
                  <ProtectedRoute path={menu.poll} component={Poll} />
                  <ProtectedRoute path={menu.pageNotFound} component={PageNotFound} />
                  <ProtectedRoute component={PageNotFound} />
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