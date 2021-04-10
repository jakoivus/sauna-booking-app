import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './HomePage.css';

class HomePage extends Component {  

  render (){
    
  return (
    <div className="home page-content flex-justify-center">
      <h1 className="main-header">Saunavuoro Varaus</h1>
      <h2 className="sub-header">Päivitä tietosi tai tee saunavuoro varaus</h2>
      <div className="navi-button-container">
        <Link to="/user">
          <Button  inverted size="huge">Omat tiedot</Button>
        </Link>
        <Link to="/booking">
          <Button  inverted size="huge">Varaus</Button>
        </Link>
      </div>
   </div>
  );
}};

export default (HomePage);