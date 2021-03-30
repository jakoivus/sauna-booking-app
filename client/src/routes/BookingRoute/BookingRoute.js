import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { NavBar, Footer }  from '../../components';
import { BgContainer } from '../../containers';
import { Booking } from '../../pages'

class BookingRoute extends Component {

render() {

  return (
    <div style={{height: "100%"}}>
     <NavBar />
      <BgContainer>
        <Booking />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingRoute);