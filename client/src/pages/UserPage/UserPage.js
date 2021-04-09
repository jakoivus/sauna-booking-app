
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormWithControl, UserDataTable } from '../../components'

class UserPage extends Component  {

  

  render ()
  {
  return (
    <div className="user page-content">
    <div className="home page-content flex-column flex-justify-center">
      {/* <h1 className="main-header inverted-text">Omat Tiedot</h1> */}
        <div className="container">
          {this.props.showUserDataTable ?
          <UserDataTable /> 
          : 
          <FormWithControl />
         }
        </div>
        {/* <Link to="/home">
          <Button inverted size="huge">Etusivu</Button>
        </Link> */}
      </div>
     </div>
  );
}}

const mapStateToProps = (state) => {
  return {
    showUserDataTable: state.user.showUserDataTable
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(UserPage));