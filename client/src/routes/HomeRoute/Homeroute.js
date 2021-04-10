import React, { Component, useEffect } from 'react';
import { BgContainer } from '../../containers';
import  { HomePage }  from '../../pages';
import { NavBar, Footer } from '../../components';

class HomeRoute extends Component { 

  render (){
    return (
      <div style={{height: "100%"}}>
      <NavBar />
        <BgContainer>
          <HomePage />
        </BgContainer>
      <Footer /> 
      </div>
    );
  };
};

export default (HomeRoute);