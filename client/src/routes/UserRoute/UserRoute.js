import React, { Component } from 'react';
import { NavBar, Footer } from '../../components';
import { BgContainer } from '../../containers';
import   { UserPage } from '../../pages';
class UserRoute extends Component {

  render (){

    return (
      <div style={{height: "100%"}}>
      <NavBar />
        <BgContainer>
          <UserPage />
        </BgContainer>
      <Footer />
      </div>
    );
  };
};

export default (UserRoute);