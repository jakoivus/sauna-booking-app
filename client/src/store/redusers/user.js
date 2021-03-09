import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    userData:  {
        userId: "",
        salution: "",
        name: ""
    },
  };

  const removeComments = (state, action) => {
    console.log("REMOVE_COMMENTS")
    return {
      ...state,
      comments: [""],
    }
  }

  const getComments = (state, action) => {
    console.log("GET_COMMENTS")
    return {
      ...state,
      comments: action.payload,
    }
  }

  const setUserData= (state, action) => {
    let userData = action.payload
    console.log("reducer userData:", userData)
    return {
      ...state,
      userData: userData
    }
  };
  

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.GET_COMMENTS: return getComments(state, action)
      case actionTypes.REMOVE_COMMENTS: return removeComments(state, action)
      case actionTypes.SET_USER_DATA: return setUserData(state, action);
    //   case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
    //   case actionTypes.UPDATE_USER: return updateUser(state, action);
      default: return state;
    }
  };
  
  export default reducer;