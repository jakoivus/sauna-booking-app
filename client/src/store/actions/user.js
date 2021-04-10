import * as actionTypes from './actionTypes';
import axios from "axios";
import { Auth } from 'aws-amplify';
import AuthConfig from '../../aws-exports';

Auth.configure(AuthConfig);

const BASE_URL = 'https://2gp5vzsczl.execute-api.eu-west-1.amazonaws.com/dev';

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
    })
    .catch(error =>{ 
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