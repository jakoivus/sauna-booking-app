import React, { Component } from 'react';
import Calendar from 'react-calendar';

class Mycalendar extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div className = "calendar-container">
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          locale="fi-fi"
        />
      </div>
    );
  }
}

export default Mycalendar