import React, { Component } from "react";
import { Route, Switch, Redirect, Link, Router } from "react-router-dom";
import SignIn from "./auth/signin/signin";
import SignUp from "./auth/signup/signup";
import Home from "./core/home/home";
import Header from "./core/header/header";

class Routing extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/signup/" exact component={SignIn} />
          <Route path="/signin/" exact component={SignUp} />
        </div>
      </Router>
    );
  }
}

export default Routing;
