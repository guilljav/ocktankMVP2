import React from "react";
import { Route, Switch } from "react-router-dom";
// import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ForgotPassword from "./containers/forgotPassword";
import Unauthorized from "./containers/Unauthorized";

import Gold from "./containers/Gold";
import Silver from "./containers/Silver";
import Bronce from "./containers/Bronce";

export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Login} props={childProps} />
    
  
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/gold" exact component={Gold} props={childProps} />
    <AppliedRoute path="/silver" exact component={Silver} props={childProps} />
    <AppliedRoute path="/bronze" exact component={Bronce} props={childProps} />
    <UnauthenticatedRoute path="/forgotpassword" exact component={ForgotPassword} props={childProps} />
    <UnauthenticatedRoute path="/unauthorized" exact component={Unauthorized} props={childProps} />
    

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
