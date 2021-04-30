import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showUserDataTable: true,
    email:"",
    role:"",
    
    userData:  {
        email:"",
        salution: "",
        firstName: "",
        lastName: "",
    },
  };

  const setEventsData = (state, action) => {
    let eventsData = action.payload
    // let eventsData = Object.assign({}, action.payload)
    // console.log ("eventsData", eventsData)
    return {
      ...state,
      events: eventsData
    }
  };

  const getUserData = (state, action) => {
    return {
      ...state,
      userData: action.payload,}
  };

  const setUser = (state, action) => {
    return{
      ...state,
      user: action.payload
    }
  }

  const setUserData = (state, action) => {
    let userData = Object.assign({}, action.payload)
    return {
      ...state,
      userData: userData,
      email: userData.email,
      role: userData.role
    }
  };

  const toggleShowUserDataTable = (state, action) => {
    return {
    ...state,
    showUserDataTable: action.payload
    }  
  }

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.SET_USER: return setUser(state, action)
      case actionTypes.GET_USER_DATA: return getUserData(state, action);
      case actionTypes.SET_USER_DATA: return setUserData(state, action);
      case actionTypes.SET_EVENTS_DATA: return setEventsData(state, action);
      case actionTypes.TOGGLE_SHOW_USER_DATA_TABLE: return toggleShowUserDataTable(state, action)
      default: return state;
    }
  };
  
  export default reducer;