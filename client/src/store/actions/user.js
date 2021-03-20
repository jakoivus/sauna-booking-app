import * as actionTypes from './actionTypes';
// import { User } from '../types';

import axios from "axios";
import { Auth } from "aws-amplify";

// import {postRequest } from './request';


const BASE_URL = 'https://oo8cnyct6j.execute-api.eu-west-1.amazonaws.com/dev'//users table
const BASE_URL_DATA = 'https://3fsjsmudsk.execute-api.eu-west-1.amazonaws.com/dev'//data table
export const helloWorld =(props) => {
  return dispatch => {
    console.log("Hello World called")
    axios.get(BASE_URL+'/hello', props)
    .then (res => {
      window.alert("Hello World From EU-WEST-1",res)
      console.log(res)
    })
    .catch(error =>{ 
      console.log("Virhe:", error)
      alert (error)
    })
  }
}

export const addComment = (comment) => {
  return dispatch => {
    console.log("addComment req:", comment)
    axios.post (BASE_URL+'/addComment', comment)
    .then (res => {
      console.log("ADD COMMENT RESPONSE DATA", res)
    })
    .catch(error =>{ 
      console.log("Virhe:", error)
      alert (error)
    })
  }
}

export const addUser = (userData) => {
  // const userData = {"userId":"jakoivus01", "name": "Jarmo Koivusaari" }
  return dispatch => {
    console.log("addUser req:", userData)
    axios.post (BASE_URL_DATA+'/addUser', userData)
    .then (res => {
      console.log("ADD USER RESPONSE DATA", res)
    })
    .catch(error =>{ 
      console.log("Virhe:", error)
      alert (error)
    })
  }
}

export const  getUserData = (email) => {
  return dispatch => {
    axios.post (BASE_URL_DATA+'/email', email)
      .then(
        res => {
          console.log("RES getUserData: ", res.data)
          dispatch (setUserData(res.data))
        })
        .catch(error =>{ 
          console.log(error)
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
  
  export const clearReduxStore = () => {
    return {
      type: "CLEAR_REDUX_STORE",
    };
  };

  export const getComments = (comments) => { 
    return {
      type: actionTypes.GET_COMMENTS,
      payload: comments,
      
    };
  };

  export const removeComments = () => { 
    return {
      type: actionTypes.REMOVE_COMMENTS,
      payload: [],
    };
  };

  export const setUserData = (userData) => {
    console.log("setuserdata")
    return {
      type: actionTypes.SET_USER_DATA,
      payload: userData
    }
  }

  // export const getUserData = (userData) => {
  //   console.log("getuserdata")
  //   return {
  //     type: actionTypes.GET_USER_DATA,
  //     payload: userData
  //   }
  // }