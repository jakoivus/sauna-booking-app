import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormWithControl, UserDataTable } from '../../components';

class UserPage extends Component  {

  render ()
  {
  return (
    <div className="home page-content flex-justify-center">
        <div className="container">
          {this.props.showUserDataTable ?
          <UserDataTable /> 
          : 
          <FormWithControl />
         }
        </div>
      </div>
  );
}};

const mapStateToProps = (state) => {
  return {
    showUserDataTable: state.user.showUserDataTable
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default (connect(mapStateToProps, mapDispatchToProps)(UserPage));