import React, { Component } from 'react'
import './App.css';

export class App extends Component {
    state = {
    locale: 'fi',
  };
  
  render ()
  {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Tästä se taas alkaa</h1>
        </header>
      </div>
    );
  }    
}

export default App;
