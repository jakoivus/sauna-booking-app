import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    userData:  {
        user: "jakoivus",
        firstName: "Jarmo",
        lastName: "",
        email: "",
        address: "",
        profession: "",
    },
  };

  const getComments = (state, action) => {
    console.log("GETCOMMENTS")
    return {

      ...state,
      comments: action.payload,
    }
  }

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case actionTypes.GET_COMMENTS: return getComments(state, action)
    //   case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
    //   case actionTypes.UPDATE_USER: return updateUser(state, action);
      default: return state;
    }
  };
  
  export default reducer;