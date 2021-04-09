import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class BigCalender extends Component {
  constructor(props) {
    super(props)
    const now = new Date();
    const events = [
      {
          id: 0,
          title: 'Kokopäivä',
          allDay: true,
          start: new Date(2021, 3, 4),
          end: new Date(2021, 3, 4),
      },
      {
          id: 1,
          title: 'Pitkä tapaaminen',
          start: new Date(2021, 3, 17),
          end: new Date(2021, 3, 20),
      },
      {
          id: 2,
          title: 'Juuri Nyt',
          start: now,
          end: now,
      },
    ]
    this.state = {
      events
    };
  }

  render() {
    return (
        <div style={{ height: '300pt'}}>
          <Calendar
            // culture='fi-FI'
            // events={this.props.tasks}
            views={['month', 'week', 'agenda']}
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (BigCalender)