import * as actionTypes from './actionTypes';
import axios from "axios";
import { Auth } from 'aws-amplify';
import AuthConfig from '../../aws-exports';

Auth.configure(AuthConfig);

const BASE_URL = 'https://4v5po72lk9.execute-api.eu-west-1.amazonaws.com/dev'

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
  return dispatch => {
    return Auth.currentSession().then(credentials => {  
      const headers = 
        {
          'Content-Type': 'application/json',
          'Authorization': credentials.idToken.jwtToken
        }
        console.log("addUser", headers)
    axios.post (BASE_URL+'/addUser', userData, 
    { headers: headers }  
    ).then (res => {
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
      const idToken = data.getIdToken();
      if (idToken && idToken.payload) {
        userData.email = idToken.payload['email'];
        userData.role = 'user';
      }
        dispatch (setUserData(userData))
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
      console.log("GET USERDATA:", res.data)}
    )
    .catch(error =>{ 
      console.log("Backend response error:", error)
      alert (error)
    })
  })
}
}

export const setUserData = (userData) => {
  console.log("setuserdata")
  return {
    type: actionTypes.SET_USER_DATA,
    payload: userData
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
  console.log("headers", headers)
  // return dispatch => {
    axios.post (BASE_URL+'/updateUserData', userData,
    { headers: headers } 
    ).then (
        res => {
          console.log("RES updateUserData: ", res.data)
          dispatch (setUserData(res.data))
          alert(res.data)
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

  