import * as actionTypes from './actionTypes';
// import { User } from '../types';

import axios from "axios";
import { Auth } from "aws-amplify";

// import {postRequest } from './request';


const BASE_URL = 'https://sqo8i17swa.execute-api.eu-west-1.amazonaws.com/dev'

export const helloWorld =(props) => {
  return dispatch => {
    console.log("Hello World called")
    axios.get(BASE_URL+'', props)
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

export const addUser = (props) => {
  return dispatch => {
    console.log("AddUser...", props)
    axios.post (BASE_URL+'users', props)
    .then (res => {
      console.log("ADD USER RESPONSE DATA", res.data)
      // console.log ('CREATE ticket return data', ticket)
      console.log("PROPS",props)
      // dispatch(sendEmail(props))
    })
    .catch(error =>{ 
      console.log("Virhe:", error)
      alert (error)
    })
  }
}

export const  readUsers = () => {
  return dispatch => {
    axios.get (BASE_URL+'users',)
      .then(
        res => {
          console.log("RES Read USERS: ", res.data)
          // const tickets = (res.data.Items)
          // dispatch(renderTickets(tickets))
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
    {
      let newcomments = []
      newcomments = comments
    }
    
  
    return {
      type: actionTypes.GET_COMMENTS,
      payload: comments,
      
    };
  };