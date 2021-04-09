import React, {Component} from "react";
import { connect } from 'react-redux';
import { Form } from "semantic-ui-react";
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from "semantic-ui-calendar-react";

class DateTimeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      dateTime: "",
      datesRange: ""
    };
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <Form>
        {/* <DateInput
          name="date"
          placeholder="Päivämäärä"
          value={this.state.date}
          iconPosition="left"
          onChange={this.handleChange}
        /> */}
        <TimeInput
          name="time"
          placeholder="Aloitus aika"
          value={this.state.time}
          iconPosition="left"
          onChange={this.handleChange}
        />
        {/* <DateTimeInput
          name="dateTime"
          placeholder="Date Time"
          value={this.state.dateTime}
          iconPosition="left"
          onChange={this.handleChange}
        />
        <DatesRangeInput
          name="datesRange"
          placeholder="From - To"
          value={this.state.datesRange}
          iconPosition="left"
          onChange={this.handleChange}
        /> */}
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user.userData.user,
  }}  ;
    
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };

export default connect(mapStateToProps, mapDispatchToProps) (DateTimeForm)
