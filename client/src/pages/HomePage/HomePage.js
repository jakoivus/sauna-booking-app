import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './HomePage.css';

const HomePage = (props) => {
  //const {formatMessage} = props.intl;

  return (
    <div className="home page-content flex-column flex-justify-center">
      <h1 className="main-header inverted-text">JavaScript</h1>
      <h2 className="sub-header inverted-text">Lipsum lpsum liirym laarum</h2>
      <div className="navi-button-container">
        <Link to="/user">
          <Button ui inverted size="huge">Omat tiedot</Button>
        </Link>
        <Link to="/Page2">
          <Button ui inverted size="huge">Sivu 2</Button>
        </Link>
        <Link to="/Page3">
          <Button ui inverted size="huge">Sivu 3</Button>
        </Link>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  conmments: 
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default (HomePage);