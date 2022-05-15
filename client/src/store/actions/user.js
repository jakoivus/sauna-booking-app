import * as actionTypes from './actionTypes';
import axios from "axios";
import { Auth } from 'aws-amplify';
import AuthConfig from '../../aws-exports';
import moment from 'moment';

Auth.configure(AuthConfig);

const BASE_URL = 'https://twh2xvcrq5.execute-api.eu-west-1.amazonaws.com/dev';

export const helloWorld = () => {
  return dispatch => {
    return Auth.currentSession().then(credentials => {  
      const headers = 
        {
          'Content-Type': 'application/json',
          'Authorization': credentials.idToken.jwtToken
        }
        axios.get(BASE_URL+'/hello',
        { headers: headers }  
        ).then (res => {
          console.log("Backend response success: ", res.data)
        })
    })
    .catch(error =>{ 
      console.log("Backend response error:", error)
      alert (error)
    }) 
  }
}

  export const signOut = () => {
  return function (dispatch) {
    dispatch(clearReduxStore());
    Auth.signOut()
      .then((data) => window.location.reload())
      .catch((err) => window.location.reload());
  }
}

export const addEvent = (eventsData) => {
  return dispatch => {
    return Auth.currentSession().then(credentials => {  
      const headers = 
        {
          'Content-Type': 'application/json',
          'Authorization': credentials.idToken.jwtToken
        }
        axios.post (BASE_URL+'/addEvent', eventsData, 
      { headers: headers }  
      ).then( res => {
        console.log("ADD EVENT ", res)
        dispatch(setEventsData(eventsData.events))
      })
      .catch(error =>{ 
        console.log("Backend response error:", error)
        alert (error)
      })
  })
}}

export const deleteEvent = (eventsData) => {
  return dispatch => {
    return Auth.currentSession().then(credentials => {  
      const headers = 
        {
          'Content-Type': 'application/json',
          'Authorization': credentials.idToken.jwtToken
        }
      axios.put (BASE_URL+'/deleteEvent', eventsData, 
      { headers: headers }  
      )
      .then( res => {
        console.log("DELETE EVENT ", res)
        // dispatch(setEventsData(eventsData))
      })
      .catch(error =>{ 
        console.log("DELETE EVENT response error:", error)
        alert (error)
      })
  })
}}
export const updateEvents = (eventsData) => {
  
  console.log("Events data updat start",eventsData)
  
  return dispatch => {
    return Auth.currentSession().then(credentials => {  
      const headers = 
      {
        'Content-Type': 'application/json',
        'Authorization': credentials.idToken.jwtToken
      }
      
      axios.post (BASE_URL+'/updateEvents', eventsData,
      { headers: headers }
      ).then( res => {
        console.log("UPDATE EVENTS ", res)
        eventsData = eventsData.events
        console.log("Events data after axios",eventsData)
        dispatch(setEventsData(eventsData))
      })
      .catch(error =>{ 
        console.log("Backend response error:", error)
        alert (error)
      })
   })
  }
}

export const getEventsData = (userData) => {
  return dispatch => {
    return Auth.currentSession().then(credentials => {  
      const headers = 
        {
          'Content-Type': 'application/json',
          'Authorization': credentials.idToken.jwtToken
        }
        console.log("GET EVENTS DATA: ", userData)
        axios.post(BASE_URL+'/getEventsData', userData,
        { headers: headers }  
        ).then (res => {

          let events = res.data.events
          if (events!== undefined){

            for (let i = 0; i < events.length; i++) {
              events[i].start = moment.utc(events[i].start).toDate();
              events[i].end = moment.utc(events[i].end).toDate();
            }
            dispatch(setEventsData(events))
          }
        })
        })
        .catch(error =>{ 
          console.log("Backend response error:", error)
          alert (error)
        }) 
  }
}


export const setEventsData = (eventsData) => {
  return {
    type: actionTypes.SET_EVENTS_DATA,
    payload: eventsData
  }
}

export const addUser = (userData) => {
  // console.log ("addUser userData" , userData)
  return dispatch => {
    return Auth.currentSession().then(credentials => {  
      const headers = 
        {
          'Content-Type': 'application/json',
          'Authorization': credentials.idToken.jwtToken
        }
        // console.log("addUser", headers)
    axios.post (BASE_URL+'/addUser', userData, 
    { headers: headers }  
    ).then (res => {
      dispatch (setUserData(userData))
    })
    .catch(error =>{ 
      console.log("Backend response error:", error)
      alert (error)
    })
  })
}}

export const  getUser = () => {
  return dispatch => {
    return Auth.currentSession()
    .then (data => {
      let userData = {email: "", role: ""}
      const idToken = data.getIdToken()
      if (idToken && idToken.payload) {
        userData.email = idToken.payload['email']
        userData.role = 'user';
      }
  
      dispatch (getUserData(userData))
    })
      .catch(error =>{ 
        console.log(error)
        alert (error)
      })

  }
}

export const  getUserData = (userData) => {
  return dispatch => {
    
    console.log ("GET USER DATA", userData )
    return Auth.currentSession().then(credentials => {  
      const headers = 
        {
          'Content-Type': 'application/json',
          'Authorization': credentials.idToken.jwtToken
        }
    axios.post (BASE_URL+'/getUserData', userData, 
    { headers: headers } 
    ).then (res => {
      dispatch (setUserData(res.data))
    }).catch(error =>{ 
      console.log("Backend response error:", error)
      dispatch (clearReduxStore())
      handleAuthSessionError(error)
      alert (error)
    })
  })
}
}

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER_DATA,
    payload: user
  }
}

export const setUserData = (userData) => {
  return {
    type: actionTypes.SET_USER_DATA,
    payload: userData
  }
}

export const toggleShowUserDataTable = (data) => {
  return {
    type: actionTypes.TOGGLE_SHOW_USER_DATA_TABLE,
    payload: data
  }
}

export const updateUserData = (userData) => {
    return dispatch => {
      return Auth.currentSession().then(credentials => {  
        const headers = 
          {
            'Content-Type': 'application/json',
            'Authorization': credentials.idToken.jwtToken
          }
      axios.post (BASE_URL+'/updateUserData', userData, 
      { headers: headers }  
      ).then (res => {
        dispatch (setUserData(userData))
      })
      .catch(error =>{ 
        console.log("Backend response error:", error)
        alert (error)
      })
    })
  }}

  export const clearReduxStore = () => {
    return {
      type: "CLEAR_REDUX_STORE",
    };
  };


  export const handleAuthSessionError = (error) => {
    console.log("Auth currentSession error: " + error);
    window.alert("Istuntosi on vanhentunut, ole hyvä ja kirjaudu uudelleen.");
    Auth.signOut()
      .then((data) => window.location.reload())
      .catch((err) => window.location.reload());
  };