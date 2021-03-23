import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    userData:  {
        email:"",
        salution: "",
        firsName: "",
        lastName: "",
    },
  };

  const addComment = (state, action) => {
    console.log("ADD_COMMENTS")
    let comment = action.payload
    return {
      ...state,
      comment: comment,
    }
  }

  const deleteComment = (state, action) => {
    console.log("ADD_COMMENTS")
    let comment = action.payload
    return {
      ...state,
      comment: comment,
    }
  }

  const getComments = (state, action) => {
    console.log("GET_COMMENTS")
    return {
      ...state,
      comments: action.payload,
    }
  }

  const removeComment = (state, action) => {
    console.log("REMOVE_COMMENT")
    return {
      ...state,
      comments: action.payload,
    }
  }

  const removeComments = (state, action) => {
    console.log("REMOVE_COMMENTS")
    return {
      ...state,
      comments: [""],
    }
  }

  const updateComments = (state, action) => {
    console.log("update_COMMENTS")
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
      userData: setuserData,
    }
  };

  const getUserData= (state, action) => {
    let getuserData = action.payload
    console.log("reducer getUserData:", getuserData)
    return {
      ...state,
      userData: getuserData
    }
  };

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
      case actionTypes.ADD_COMMENT: return addComment(state, action)
      case actionTypes.GET_COMMENTS: return getComments(state, action)
      case actionTypes.DELETE_COMMENT: return deleteComment(state, action)
      case actionTypes.REMOVE_COMMENT: return removeComment(state, action)
      case actionTypes.REMOVE_COMMENTS: return removeComments(state, action)
      case actionTypes.UPDATE_COMMENTS: return updateComments(state, action)
      case actionTypes.GET_USER_DATA: return getUserData(state, action);
      case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
      
      case actionTypes.SET_USER_DATA: return setUserData(state, action);
    //   case actionTypes.UPDATE_USER_DATA: return updateUserData(state, action);
    //   case actionTypes.UPDATE_USER: return updateUser(state, action);
      default: return state;
    }
  };
  
  export default reducer;