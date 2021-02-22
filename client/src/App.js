import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { HomeRoute , Page2Route, Page3Route, UserRoute } from './routes/'
import * as actions from './store/actions/index';
import './App.css';


import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

export class App extends Component {
    state = {
    locale: 'fi',

  };

  logOut = () => {
    console.log("Logout")
    this.props.signOut();
    return <Redirect to="/" />;
  }

  render ()
  {

    const routes = (
      <Switch>
       <Route path="/home" exact component={HomeRoute} />       
       <Route path="/Page2" exact component={Page2Route} />
       <Route path="/Page3" exact component={Page3Route} />
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
  }    
}


const mapStateToProps = (state) => {
return {
  };
};

const mapDispatchToProps = (dispatch) => {
return {
  signOut: () => dispatch(actions.signOut()),
};
};

export default withRouter(withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(App)))
// export default App;
