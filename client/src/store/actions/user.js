import * as actionTypes from './actionTypes';
import axios from "axios";
import { Auth } from "aws-amplify";

const BASE_URL = 'https://29fydiore5.execute-api.eu-west-1.amazonaws.com/dev'//users table
const BASE_URL_DATA = 'https://3fsjsmudsk.execute-api.eu-west-1.amazonaws.com/dev'//data table
const BASE_URL_COMMENTS = 'https://3fsjsmudsk.execute-api.eu-west-1.amazonaws.com/dev'//comments table


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

export const signOut = () => {
  return function (dispatch) {
    dispatch(clearReduxStore());
    Auth.signOut()
      .then((data) => window.location.reload())
      .catch((err) => window.location.reload());
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

export const deleteComment = (comment) => { 
  return dispatch => {
    console.log("DELETE COMMENT", comment)
    axios.post (BASE_URL+'/deleteComment', comment)
    .then( res => {
      console.log("RESPONSE DELETE COMMENT", res)
      // dispatch ((updateComments(res.data.Items)))
    })
    .catch(error =>{ 
      console.log("Virhe:", error)
      alert (error)
    })
  }
};

export const getComments = (comments) => { 
  return dispatch => {
    console.log("GET COMMENTS")
    axios.get (BASE_URL+'/getComments', comments)
    .then( res => {
      console.log("RESPONSE GETCOMMENTS", res.data.Items)
      dispatch ((updateComments(res.data.Items)))
    })
    .catch(error =>{ 
      console.log("Virhe:", error)
      alert (error)
    })
  }
};

export const updateComments = (comments) => {
  return {
    type: actionTypes.UPDATE_COMMENTS,
    payload: comments,
    
  }
}

export const removeComment = (newComments) => { 
  return {
    type: actionTypes.REMOVE_COMMENT,
    payload: newComments,
  };
};

export const removeComments = () => { 
  return {
    type: actionTypes.REMOVE_COMMENTS,
    payload: [],
  };
};

export const addUser = (userData) => {
  return dispatch => {
    axios.post (BASE_URL+'/addUser', userData)
    .then (res => {
    })
    .catch(error =>{ 
      console.log("Virhe:", error)
      alert (error)
    })
  }
}

export const  getUser = (email) => {
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

export const  getUserData = (email) => {

}

// export const updateUserData = (userData) => {
//   return dispatch => {
//     console.log("update_user USERDATA", userData)
//     axios.post (BASE_URL+'/updateUserData',userData)
//     .then (res => {
//       console.log("UPDATE_USER_DATA res:", res) 
//     })
//     .catch(error =>{ 
//       console.log("Virhe:", error)
//       alert (error)
//     })
//   }
// }

export const updateUserData = (email) => {
  console.log("Mail", email)
  return dispatch => {
    axios.post (BASE_URL+'/getUser', email)
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

  export const setUserData = (userData) => {
    console.log("setuserdata")
    return {
      type: actionTypes.SET_USER_DATA,
      payload: userData
    }
  }

  export const clearReduxStore = () => {
    return {
      type: "CLEAR_REDUX_STORE",
    };
  };