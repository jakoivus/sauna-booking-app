import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Form } from 'semantic-ui-react'
import * as actions from '../../store/actions/index'
import { v4 as uuidv4 } from 'uuid'

const localizer = momentLocalizer(moment);
const messages ={
  previous: '<',
  next: '>',
  today: 'Tänään',
  day:'Paivä',
  week: 'Viikko',
  month: 'Kuukausi',
  agenda: 'Varaukset'
  }

let persistedEvents = [] //  JSON.parse(localStorage.getItem("events"))

class BigCalender extends Component {

    state = { 
      events: [
      {
          id: "5421432öjölkjölk",
          title: 'Kokopäivä',
          allDay: true,
          start: new Date(2021, 3, 12, 12),
          end: new Date(2021, 3, 12, 13),
      },
      {
          id: "rölkjölkjq6098572",
          title: 'Pitkä tapaaminen',
          start: new Date(2021, 3, 17),
          end: new Date(2021, 3, 20),
      },
      {
          id: "ghfsaölkjöa6+5932+5",
          title: 'Juuri Nyt',
          start: new Date(2021, 3, 14),
          end: new Date(2021, 3, 14),
      },
    ],
    isAddModalOpen: false,
    isEditModalOpen: false,
    };

  componentDidMount () {
    // console.log("state.events:", this.state .events)
      let userData = {email: ""}
      userData.email = this.props.user.email
      let eventsData = this.props.getEventsData(userData)
      console.log ("Did Mount", eventsData)
      // this.setState({
      //   ...this.state,
      //   events: [eventsData]
      // })
  }

  componentDidUpdate(prevprops) {
    if (prevprops.events != this.state.events){
    }
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleAddEvent = () => {
    let email = this.props.user.email
    console.log("handle AddEvent email", email)
    const {title, start, end} = this.state
    if(title) {
    // }
    this.setState({
      isAddModalOpen: !this.state.isAddModalOpen,
      events: [
        ...this.state.events,
        {
          id: uuidv4(),
          title,
          start,
          end,
        },
      ],
    }, () => {let eventsData = {
      email: this.props.user.email,
      events: this.state.events}
      console.log("kukkuu",eventsData)
      let event = this.state.events
      this.props.addEvent(eventsData)
    })
    // localStorage.setItem("events", JSON.stringify(this.state.events))

  }
}

  toggleAddModal = ({start, end})  => {
    if (!this.state.isAddModalOpen) {
      this.setState({
        ...this.state,
        isAddModalOpen: !this.state.isAddModalOpen,
        // events:  [...this.state.events ], 
          start,
          end
      });
    }
  }


  toggleEditModal = event => {    
    if (!this.state.isAddModalOpen) {
      this.setState({
        // currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
      });
    }
  };

  render() {

    return (
      
        <div style={{ height: '300pt'}}>
          {console.log("this.state.events:", this.state.events)}
          <Calendar  messages={messages}
            selectable  
            // views={['month', 'week', 'day', 'agenda']}
            defaultView={Views.WEEK}
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            // onSelectEvent={event => alert(event.title)}
            onSelectSlot={event => this.toggleAddModal(event) }
            onSelectEvent={event => this.toggleEditModal(event)}
            // onSelectSlot={this.handleSelectSlot}
          />
            <Modal open={this.state.isAddModalOpen}>
            <div className="container">
              <h1 className="flex-column flex-justify-center">LISÄÄ VARAUS</h1>
              <Form >
                <Form.Group widths='equal'>
                  <Form.Input 
                    fluid label='Varauksen Nimi' 
                    placeholder='Varauksen Nimi'
                    name='title'
                    // defaultValue= "Varauksen nimi"
                    onChange={this.handleChange} 
                    /> 
                  <Form.Input 
                    fluid label='Aloitus aika' 
                    placeholder='Aloitus aika'
                    name='start'
                    defaultValue={this.state.start}
                    onChange={this.handleChange} />
                  <Form.Input 
                    fluid label='Lopetus aika' 
                    placeholder='Lopetus aika'
                    name='end'
                    defaultValue={this.state.end}
                    onChange={this.handleChange} />
                </Form.Group>
                <Form.Field>
                <div className="flex-row">
                  <Form.Button
                    type="button"
                    onClick={()=>{{this.handleAddEvent()}}}
                    >Lisää Varaus</Form.Button>
                </div>
                </Form.Field>
              </Form>        
            </div>


            </Modal>
                <Modal open={this.state.isEditModalOpen} >
            </Modal>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {

      user: state.user,
      events: state.events
  }}  
    
  const mapDispatchToProps = (dispatch) => {
    return {
      addEvent: (eventData) => dispatch(actions.addEvent(eventData)),
      getEventsData: (userData) => dispatch(actions.getEventsData(userData)),
      getUser: () => dispatch(actions.getUser()),
      helloWorld: () => dispatch(actions.helloWorld()),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps) (BigCalender)