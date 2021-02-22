import * as actionTypes from './actionTypes';
// import { User } from '../types';
import { Auth } from "aws-amplify";

// import {postRequest } from './request';

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