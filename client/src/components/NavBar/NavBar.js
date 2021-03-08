import React from 'react';
// import { injectIntl} from "react-intl";
import {Menu, Dropdown, Icon} from 'semantic-ui-react';
import {Link, useHistory} from 'react-router-dom';

// import {AmplifySignOut  } from '@aws-amplify/ui-react'; 
import './NavBar.css';
import { connect } from 'react-redux';
import  logo from '../../assets/img/saunalogo.png';

// const logo = require('../../assets/img/talo.svg') as string;



const NavBar = (props) => {
  
  // const {formatMessage} = props.intl;
  
  const userLinks = [
    {icon: "user", url: "/user", text: 'Omat tiedot'},
    {icon: "id card", url: "/Sivu2", text: 'Sivu 2'},
    {icon: "wrench", url: "/Page3", text: 'Sivu 3'},
    {icon: "table", url: "/Page4", text: 'Sivu 4'},
    {icon: "log out", url:"/logout", text: 'Kirjaudu ulos' }
  ];

  return(    
    <Menu inverted fixed="top" color="orange" className="navbar">
      <div className="navbar-main">
        <div className="flex-row dropdown-container">
          <DropdownMenu links={ userLinks } />
          <Link to="/" className="full-height">
            <div className="full-height">
              <img alt="talo" src={logo} className="navbar-logo"></img>
            </div>
          </Link>
        </div>
      </div>
    </Menu>
  );
}

const DropdownIcon = (
  <Icon name="bars" color="orange" size="large"></Icon>
);

const DropdownMenu = (props) => {
  
  const history = useHistory();
  if(!props.links) return null;
  
  const items = props.links.map(link => (
    <Dropdown.Item key={link.url} onClick={()=>history.push(link.url)}>
      <Icon name={link.icon} color="orange" className="dropdown-link-icon" />
      <span className="dropdown-link">{link.text}</span>
    </Dropdown.Item>
  ));

  return(
    <Dropdown icon={DropdownIcon} simple>
      <Dropdown.Menu>
        {items}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const mapStateToProps = (state) => {
  return {
      userData: state.user.userData,
  };
}

export default (NavBar);