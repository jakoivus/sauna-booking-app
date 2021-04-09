import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showUserDataTable: false,
    email:"",
    role:"",
    
    userData:  {
        email:"",
        salution: "",
        firstName: "",
        lastName: "",
    },
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

  const getUserData = (state, action) => {
    return {
      ...state,
      userData: action.payload,}
  };

  const toggleShowUserDataTable = (state, action) => {
    return {
    ...state,
    showUserDataTable: action.payload
    }  
  }

  const updateUserData= (state, action) => {
    let updateuserData = action.payload
    console.log("reducer updateUserData:", updateuserData)
    return {
      ...state,
      userData: updateuserData
    }
  };
  

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.SET_USER: return setUser(state, action)
      case actionTypes.GET_USER_DATA: return getUserData(state, action);
      case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
      case actionTypes.SET_USER_DATA: return setUserData(state, action);
      case actionTypes.TOGGLE_SHOW_USER_DATA_TABLE: return toggleShowUserDataTable(state, action)
    //   case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
    //   case actionTypes.UPDATE_USER: return updateUser(state, action);
      default: return state;
    }
  };
  
  export default reducer;