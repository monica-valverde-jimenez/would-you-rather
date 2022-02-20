import React, { Component } from 'react';
import classes from 'classnames';
import get from 'lodash/get';
import { NavLink, withRouter } from 'react-router-dom'
import './Navigation.css';
import getMenuLinks from '../../utils/getMenuLinks';

class Navigation extends Component {
  render() {
    const menu = getMenuLinks();
    const { location, user = {}, isAuthenticated = false, onLogout } = this.props;
    const pathname = get(location, ['pathname']);
    return (
      <div className='navigation-wrapper'>
        <div className='navigation-inner'>
          <ul>
            <li className={classes('navigation-menu', {
              'navigation-menu--active': pathname === menu.home,
            })}>
              <NavLink to={menu.home} exact>
                Home
              </NavLink>
            </li>
            <li className={classes('navigation-menu', {
              'navigation-menu--active': pathname === menu.newQuestion,
            })}>
              <NavLink to={menu.newQuestion}>
                New Question
              </NavLink>
            </li>
            <li className={classes('navigation-menu', {
              'navigation-menu--active': pathname === menu.leaderBoard,
            })}>
              <NavLink to={menu.leaderBoard}>
                Leader Board
              </NavLink>
            </li>
          </ul>
          <div className='navigation-login'>
          {isAuthenticated && (
            <div>
              <div className='navigation-info'>Hello! <strong>{user.name}</strong></div>
              <div className='navigation-avatar'><img src={`/images/avatars/${user.avatarURL}`} alt={user.name}/></div>
              <div className='navigation-logout'><button onClick={onLogout}>Logout</button></div>
            </div>
          )}
        </div>
        </div>
        <div className='navigation-divider' />
      </div>
    );
  }
}

export default withRouter(Navigation);