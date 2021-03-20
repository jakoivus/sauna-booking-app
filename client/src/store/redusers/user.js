import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    userData:  {
        id: "",
        email:"",
        salution: "",
        firsName: "",
        lastName: "",
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
    let setuserData = action.payload
    console.log("reducer setuserData:", setuserData)
    return {
      ...state,
      userData: setuserData
    }
  };

  const getUserData= (state, action) => {
    let getuserData = action.payload
    console.log("reducer getuserData:", getuserData)
    return {
      ...state,
      userData: getuserData
    }
  };
  

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.GET_COMMENTS: return getComments(state, action)
      case actionTypes.REMOVE_COMMENTS: return removeComments(state, action)
      case actionTypes.GET_USER_DATA: return getUserData(state, action);
      case actionTypes.SET_USER_DATA: return setUserData(state, action);
    //   case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
    //   case actionTypes.UPDATE_USER: return updateUser(state, action);
      default: return state;
    }
  };
  
  export default reducer;