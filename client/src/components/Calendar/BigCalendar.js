import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Form } from 'semantic-ui-react'
import * as actions from '../../store/actions/index'
import { v4 as uuidv4 } from 'uuid'

moment.locale("fi-FI")
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
      // {
      //     id: "5421432öjölkjölk",
      //     title: 'Vappu marssi',
      //     // allDay: true,
      //     start: new Date(2021, 3, 30, 12, 0),
      //     end: new Date(2021, 3, 30, 13, 0),
      // },
      // {
      //     id: "rölkjölkjq6098572",
      //     title: 'Silli aamiainen',
      //     start: new Date(2021, 4, 1, 9 ,0),
      //     end: new Date(2021, 4, 1, 10, 0),
      // },
      // {
      //     id: "ghfsaölkjöa6+5932+5",
      //     title: 'Juuri Nyt',
      //     // start: moment().toDate(),
      //     start: new Date(2021, 3, 30, 14),
      //     end: new Date(2021, 3, 30, 15),
      // },
    ],
    isAddModalOpen: false,
    isEditModalOpen: false,
    };

  componentDidMount () {
    let userData = {email: ""}

    userData.email = this.props.user.email
    this.props.getEventsData(userData)
    console.log ("Component Did Mount", )
  }

  componentDidUpdate(prevprops) {
    if (this.props.events != prevprops.events ){
      // this.state.events = this.props.events
      this.setState({
        ...this.state,
        events:[...this.props.events]
      })
      console.log ("Component Did update")
    }
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleAddEvent = () => {
    const {title, start, end} = this.state
    if(title) {
    this.setState({
      isAddModalOpen: !this.state.isAddModalOpen,
      events: [
        ...this.state.events,
        {
          id: uuidv4(),
          end,
          start,
          title,
        },
      ],
    }, () => {let eventsData = {
      email: this.props.user.email,
      events: this.state.events}
      this.props.addEvent(eventsData)
    })
  }
}

  toggleAddModal = ({start, end})  => {
    if (!this.state.isAddModalOpen) {
      this.setState({
        ...this.state,
        isAddModalOpen: !this.state.isAddModalOpen,
        events:  [...this.state.events ], 
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

  eventsData =() => {
    return this.props.events
  }

  render() {
    
    let events = this.state.events
    let isAddModalOpen = this.state.isAddModalOpen
    return (
        <div style={{ height: '300pt'}}>
          <Calendar  messages={messages}
            selectable
            localizer={localizer}
            // views={['month', 'week', 'day', 'agenda']}
            defaultView={Views.WEEK}
            events={events}
            startAccessor="start"
            endAccessor="end"
            // defaultDate={moment().toDate()}
            // date={new Date(Date.now())}
            scrollToTime={moment() .set({ h: 9, m: 0 }) .toDate()}
            onSelectSlot={event => this.toggleAddModal(event) }
            onSelectEvent={event => this.toggleEditModal(event)}
          />
            <Modal 
            open={this.state.isAddModalOpen}
            onClose={() => this.setState({isAddModalOpen: !isAddModalOpen})}
            >
            <div className="container">
              <h1 className="flex-column flex-justify-center">LISÄÄ VARAUS</h1>
              <Form >
                <Form.Group widths='equal'>
                  <Form.Input 
                    fluid label='Varauksen Nimi' 
                    placeholder='Varauksen Nimi'
                    name='title'
                    autoFocus
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
      events: state.user.events
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