import React from 'react';
import {Menu,} from 'semantic-ui-react';
import './Footer.css'
import  logo from '../../assets/img/saunalogo.png'


const Footer = (props) => {
  

  return(    
    <Menu inverted fixed="bottom" color="orange" className="footer">
      <div className="footer-main">
        <div className="flex-row dropdown-container">
            <div className="full-height">
              {/* <img alt="talo" src={logo} className="navbar-logo"></img> */}
            </div>
          </div>
      </div>
    </Menu>
  );
}

export default (Footer);