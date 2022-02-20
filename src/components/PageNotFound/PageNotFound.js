import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="page-not-found-wrapper">
      <strong>Whoops!</strong><br/>
      404 Page Not found. <br/><br/>
      <Link to={{ pathname: `/` }}>Try our Home page instead</Link>
    </div>
  );
}

export default withRouter(PageNotFound);