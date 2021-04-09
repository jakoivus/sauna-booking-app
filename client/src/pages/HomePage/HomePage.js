import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './HomePage.css';

class HomePage extends Component {  

  render (){
    
  return (
    <div className="home page-content flex-column flex-justify-center">
      <h1 className="main-header inverted-text">Saunavuoro Varaus</h1>
      <h2 className="sub-header inverted-text">Päivitä tietosi tai tee saunavuoro varaus</h2>
      <div className="navi-button-container">
        <Link to="/user">
          <Button  inverted size="huge">Omat tiedot</Button>
        </Link>
        <Link to="/booking">
          <Button  inverted size="huge">Varaus</Button>
        </Link>
        {/* <Link to="/Page3">
          <Button  inverted size="huge">Sivu 3</Button>
        </Link> */}
      </div>
   </div>
  );
}}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default (HomePage);