import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Form,Button } from 'semantic-ui-react'
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

// let persistedEvents = [] //  JSON.parse(localStorage.getItem("events"))

class BigCalender extends Component {

    state = { 
      isAddModalOpen: false,
      isEditModalOpen: false,
      event: {id:"",
              title: "",
              start: "",
              end:""
    },
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
    };

  componentDidMount () {
    let userData = {email: ""}
    userData.email = this.props.user.email
    this.props.getEventsData(userData)
    console.log ("Component Did Mount" )
  }

  componentDidUpdate(prevprops) {
    if (this.props.events !== prevprops.events ){
      this.setState({
        ...this.state,
        events:[...this.props.events]
      })
      
    console.log ("Component Did Update" )
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

  handleDeleteEvent = () => {
    let index = this.state.events.indexOf(this.state.currentEvent)
    window.alert("STOP")
    this.state.events.splice(index, 1);

    let eventsData = {
      email: this.props.user.email,
      events: this.state.events
    } 
    this.props.deleteEvent(eventsData)
  }

  handleDisplayEvent = (event) => {
    console.log("EVENT AT CALL",event)
    let  index = this.state.events.indexOf(event)
    let currentEvent = this.state.events[index]
    console.log("INDEX", index)
    console.log("CURRENTEVENT",  currentEvent)
    this.setState({
      ...this.state,
      isEditModalOpen: !this.state.isEditModalOpen,
      events:  [...this.state.events], 
      event: currentEvent,
      }, () => {
        console.log ("STATE:::", this.state)
        // this.handleUpdateEvents()
      })
    }    

  handleUpdateEvents = (props) => {
    var index = this.state.events.indexOf(this.state.currentEvent)
    console.log("Current event: ", this.state.events[index])
    window.alert("STOP")
    // if (index > -1) {
    //   this.state.events.splice(index, 1);
    // }
    let eventsData = {
      email: this.props.user.email,
      events: this.state.events}
    this.props.updateEvents(eventsData)}

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

  toggleEditModal = (event) => {    
    if (!this.state.isEditModalOpen) {
      this.setState({
        ...this.state,
        currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
        events:  [...this.state.events ], 
        event
      });
    }
  };

  eventsData =() => {
    return this.props.events
  }

  render() {
    
    let events = this.state.events
    let isAddModalOpen = this.state.isAddModalOpen
    let isEditModalOpen = this.state.isEditModalOpen
    
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
            scrollToTime={moment().set({ h: 9, m: 0 }).toDate()}
            onSelectSlot={event => this.toggleAddModal(event) }
            // onSelectEvent={event => {this.toggleEditModal(event)}}
            
            onSelectEvent={(event) => this.handleDisplayEvent(event)}
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
                    onClick={()=>{this.handleAddEvent()}}
                    >Lisää Varaus</Form.Button>
                </div>
                </Form.Field>
              </Form>        
            </div>
            </Modal>
            
            <Modal 
            open={this.state.isEditModalOpen}
            onClose={() => this.setState({isEditModalOpen: !isEditModalOpen})}
            >
             <div className="container">

              <h1 className="flex-column flex-justify-center">Muokkaa varausta</h1>
              
                <Form >
                  <Form.Group widths='equal'>
                    <Form.Input 
                      fluid label='Varauksen Nimi' 
                      placeholder='Varauksen Nimi'
                      name='title'
                      defaultValue={this.state.event.title}
                      onChange={this.handleChange} />
                    <Form.Input 
                      fluid label='Aloitus aika' 
                      placeholder='Aloitus aika'
                      name='start'
                      defaultValue={this.state.event.start}
                      onChange={this.handleChange} />
                    <Form.Input 
                      fluid label='Lopetus aika' 
                      placeholder='Lopetus aika'
                      name='end'
                      defaultValue={this.state.event.end}
                      onChange={this.handleChange} />
                  </Form.Group>
                </Form>
                  </div> 
        
                <Modal.Actions>
                        <Button basic color='green' 
                          // onClik={()=>{this.handleAddEvent()}}
                          onClick={() => {
                            this.handleUpdateEvents(this.state.events)
                            this.setState({isEditModalOpen: !isEditModalOpen})}}
                          positive
                          icon='checkmark'>
                        </Button>
                        <Button basic color='orange' 
                            onClick={() => this.setState({isEditModalOpen: !isEditModalOpen})}
                            icon='close'>   
                        </Button>
                        <Button basic color='red' 
                            onClick={()=>{this.handleDeleteEvent(this.state.events)
                              // onClick={()=>{this.handleDeleteEvent(this.state.id)
                                this.setState({isEditModalOpen: !isEditModalOpen})}}
                            icon='trash'> 
                        </Button>
                </Modal.Actions>
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
      addEvent: (eventsData) => dispatch(actions.addEvent(eventsData)),
      deleteEvent: (eventsData) => dispatch(actions.deleteEvent(eventsData)),
      updateEvents: (eventsData) => dispatch(actions.updateEvents(eventsData)),
      getEventsData: (userData) => dispatch(actions.getEventsData(userData)),
      setEventsData: (eventsData) => dispatch (actions.setEventsData(eventsData)),
      getUser: () => dispatch(actions.getUser()),
      helloWorld: () => dispatch(actions.helloWorld()),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps) (BigCalender)