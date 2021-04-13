import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Form } from 'semantic-ui-react'

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


class BigCalender extends Component {

    state = { 
      events: [
      {
          id: 0,
          title: 'Kokopäivä',
          allDay: true,
          start: new Date(2021, 3, 12, 12),
          end: new Date(2021, 3, 12, 13),
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
          start: new Date(2021, 3, 14),
          end: new Date(2021, 3, 14),
      },
    ],
    isAddModalOpen: false,
    isEditModalOpen: false,
    };

  componentDidMount () {
  }

  handleChange = (event, { name, value }) => {
    console.log (name)
    this.setState({ [name]: value })
  }

  handleAddEvent = () => {
    
    const {title, start, end} = this.state
    if(title) {
    // }
    this.setState({
      isAddModalOpen: !this.state.isAddModalOpen,
      events: [
        ...this.state.events,
        {
          title,
          start,
          end,
        },
      ],
    })
  }
}

  toggleAddModal = ({start, end})  => {
    if (!this.state.isAddModalOpen) {
      this.setState({
        isAddModalOpen: !this.state.isAddModalOpen,
        events:  [...this.state.events,
          ], 
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
    console.log("state:", this.state.events[this.state.events.length])
  };

  render() {

    return (
      
        <div style={{ height: '300pt'}}>
          {    console.log("STATE:", this.state)}
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
                    defaultValue= "Varauksen nimi"
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
      user: state.user.userData.user,
  }}  ;
    
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };

export default connect(mapStateToProps, mapDispatchToProps) (BigCalender)