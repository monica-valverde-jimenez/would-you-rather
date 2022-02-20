import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ name, avatarURL, children }) {
  return (
    <div className="card-wrapper">
      {name && (<div className="card-header">{name} asks:</div>)}
      <div className="card-inner">
        <div className="card-avatar"><img src={`/images/avatars/${avatarURL}`} alt={name} /></div>
        <div className="card-description">
          {children}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  avatarURL: PropTypes.string,
};

export default Card;