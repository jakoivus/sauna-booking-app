import React, {Component } from 'react';
import { connect } from 'react-redux';
import { NavBar, Footer } from '../../components';
import { BgContainer } from '../../containers';
import { Page2 } from '../../pages';  

class Page2Route extends Component {

render() {

  return (
    <div style={{height: "100%"}}>
    <NavBar />
      <BgContainer>
        <Page2 />
      </BgContainer>
    <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Page2Route);