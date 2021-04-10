import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const messages ={
  previous: '<',
  next: '>',
  today: 'Tänään',
  day:'paivä',
  week: 'Viikko',
  month: 'Kuukausi',
  agenda: 'Varaukset'
  }

  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'ogange',
    },
  })

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

  // handleSelectSlot = (window.alert("Date selected"))

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  render() {
    return (
        <div style={{ height: '300pt'}}>
          <Calendar  messages={messages}
            selectable  
            // views={['month', 'week', 'day', 'agenda']}
            defaultView={Views.WEEK}
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect}  
            // drilldownView="date"
            // components={{
            //   timeSlotWrapper: ColoredDateCellWrapper,
            // }}
            // onSelectSlot={this.handleSelectSlot}
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