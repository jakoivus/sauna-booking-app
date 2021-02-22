import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { NavBar }  from '../../components';
import { BgContainer } from '../../containers';
import { Page3 } from '../../pages'

class Page3Route extends Component {
// class Page3Route   = (props) => {

render(){

  return (
    <div style={{height: "100%"}}>
     <NavBar />
      <BgContainer>
        <Page3 />
      </BgContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Page3Route);