import React, { Component } from 'react';
import  { NavBar, Footer }  from '../../components';
import { BgContainer } from '../../containers';
import { Booking } from '../../pages';

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
  }
};

export default (BookingRoute);