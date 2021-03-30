import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Dropdown, Form, Grid, GridColumn, StatusBubble, Table } from 'semantic-ui-react'
import axios from "axios";
import * as actions from "../../store/actions/index";
import './Booking.css';
import { Modal, Mycalendar } from '../../components'

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
      <div className="home page-content flex-column flex-justify-center">        
        <Mycalendar />
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