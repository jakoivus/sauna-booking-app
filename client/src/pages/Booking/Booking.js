import React, {Component} from 'react';
import './Booking.css';
import { BigCalendar } from '../../components';

class Booking extends Component {  

  render ( ) {

    return (
      <div className="home page-content flex-justify-center"> 
      <div className="calendar-container">
      <h1 className="flex-column flex-justify-center">VARAUS KALENTERI</h1>       
        <BigCalendar />
        </div>
      </div>  
    );
  };
};

export default (Booking);