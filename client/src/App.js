import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { HomeRoute , BookingRoute, UserRoute } from './routes/';
import * as actions from './store/actions/index';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import MySignIn from "./components/AuthHandler/AuthHandler";

Amplify.configure(awsconfig);


export class App extends Component {
    state = {
  };

  componentDidMount() {
    console.log("kukkuu")
    // this.props.helloWorld();
    this.props.getUser()
    // this.props.getEventsData()
  };

  logOut = () => {
    console.log("Logout")
    this.props.signOut();
    return <Redirect to="/" />;
  };

  render ()
  {

    const routes = (
      <Switch>
       <Route path="/home" exact component={HomeRoute} />
       <Route path="/booking" exact component={BookingRoute} />
       <Route path="/user" exact component={UserRoute} />
       <Route path="/logout" exact render={this.logOut} />
      <Redirect from="/" to="/home" />
      </Switch>
      );

      const appView = (
        <div>
          {routes}
        </div>
      );

    return (
      <div>
        {appView}
      </div>
    );
  };    
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    helloWorld: () => dispatch(actions.helloWorld()),
    getUser: () => dispatch(actions.getUser()),
    getEventsData: (userData) => dispatch(actions.getEventsData(userData)),
    signOut: () => dispatch(actions.signOut()),
  };
};

export default withRouter(
  withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(App), 
  false, 
  [
      <MySignIn/>
  ]
  )
);

