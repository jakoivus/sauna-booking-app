// import React, { Component, useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'
// import moment from 'moment'


// function Mycalendar() {
//   const [dateState, setDateState] = useState(new Date())
//   const changeDate = (e) => {
//     setDateState(e)
//   }
//   return (
//     <>
//       <Calendar 
//       locale="fi-fi"
//       value={dateState}
//       onChange={changeDate}
//       />
//     <p>Valittu päivä on  <b>{moment(dateState).locale('fi').format('MMMM Do YYYY')}</b></p>
//     </>
//   )
// }

// export default Mycalendar

// class Mycalendar extends Component {
//   state = {
//     date: new Date(),
//   }
  

//   // onChange = date => this.setState({ date })

  
//   handleChangeDate = (event, { name, value }) => {

//     this.setState({ [name]: value })
//     console.log("state",this.state)
//   }

//   render() {
    

//     return (
//       <div >
//         <Calendar
//           onChange={this.handleChangeData}
//           name='date'
//           defaultValue={this.state.date}
//           locale="fi-fi"
//         />
//           <p>Valittu päivä on  <b>{moment(this.state.date).locale('fi').format('MMMM Do YYYY')}</b></p>
//        </div>
//     );
//   }
// }

// export default Mycalendar