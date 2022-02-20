import React from "react";
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import Signin from '../Signin/Signin';


function ProtectedRoute({ component: Component, ...props }) {
  const authUser = useSelector(store => store.authUser);
  const isAuthenticated = authUser?.isAuthenticated;
  return (
    <Route {...props} component={isAuthenticated ? Component : Signin} />
  );
}

export default ProtectedRoute;
