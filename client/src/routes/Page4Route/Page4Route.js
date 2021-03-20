import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { NavBar }  from '../../components';
import { BgContainer } from '../../containers';
import { Page4 } from '../../pages'
import './Page4Route.css'

class Page4Route extends Component {

render() {

  return (
    <div style={{height: "100%"}}>
      <BgContainer>
        <NavBar />
            <Page4 />
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

export default connect(mapStateToProps, mapDispatchToProps)(Page4Route);