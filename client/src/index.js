import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from "redux-thunk";
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';

let composeEnhancers = compose;
if (process.env.REACT_APP_BUILD_TYPE !== "production") {
  composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const appReducer = combineReducers({
  // user: userReducer
})

export const rootReducer = appReducer

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>   
)

ReactDOM.render(app, document.getElementById('root')
);