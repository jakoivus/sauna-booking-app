import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { HomeRoute } from './routes/'
import './App.css';

export class App extends Component {
    state = {
    locale: 'fi',
  };
  
  render ()
  {

    const routes = (
      <Switch>
       <Route path="/home" exact component={HomeRoute} />       
       {/* <Route path="/Sivu2" exact component={Sivu2Route} /> */}
       {/* <Route path="/Sivu3" exact component={Sivu3Route} /> */}
       {/* <Route path="/user" exact component={UserRoute} /> */}
       <Route path="/logout" exact render={this.logOut} />
      <Redirect from="/" to="/home" />
      </Switch>
      );

      const appView = (
        <div>
          {/* <AmplifySignOut /> */}
          {routes}
        </div>
      );

    return (
      <div>
        {appView}
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <h1>Tästä se taas alkaa</h1>
      //   </header>
      // </div>
    );
  }    
}

export default App;
