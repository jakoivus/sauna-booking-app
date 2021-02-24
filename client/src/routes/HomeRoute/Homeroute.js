import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { BgContainer } from '../../containers';
import  { HomePage }  from '../../pages';
import { NavBar } from '../../components'

class HomeRoute extends Component { 

render (){
  return (
    <div style={{height: "100%"}}>
     <NavBar />
      <BgContainer>
        <HomePage />
      </BgContainer>
    </div>
  );
  }
}
const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRoute);