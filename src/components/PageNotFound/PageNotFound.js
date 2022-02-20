import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="page-not-found-wrapper">
      Page Not found. <br/>
      <Link to={{ pathname: `/` }}>Click here to Go Home</Link>
    </div>
  );
}

export default withRouter(PageNotFound);