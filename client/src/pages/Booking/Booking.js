import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import './Booking.css';
import { DateTimeForm, Mycalendar, BigCalendar } from '../../components'

class Booking extends Component {  

  state = {
    comments: [],
    rowFilter:""
  }

  componentDidMount() { 
  }

  componentDidUpdate() {
  }

  handleChange = (e, { name, value }) => {
    this.setState({[name]: value })}

  handleRemove = (props) => { 
  }

  handleLoad = () => {
  }

  render ( ) {

    return (
      <div className="home page-content flex-justify-center"> 
      <div className="calendar-container">
      <h1 className="flex-column flex-justify-center">VARAUS KALENTERI</h1>       
        <BigCalendar />
        {/* <Mycalendar />
        <DateTimeForm /> */}
        </div>
      </div>  
    );
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userData.user,
}}  ;
  
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);