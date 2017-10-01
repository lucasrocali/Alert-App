import { AsyncStorage } from 'react-native'

// const API = 'https://rocali-alert-api.herokuapp.com/';
// const APIToken = "JRHApPRyt4CnTTyUUHzC"

const API = 'http://localhost:3000';
const APIToken = "Me4brAzf2yzxzhHTtDs2"

token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMiwiZXhwIjoxNTA2OTc4NTk2fQ.hgvljMS7MDNSuPk8KeqoauZ1B7UPotMrzlI2f7wo_7A';
export const apiMiddleware = store => next => action => {
  next(action);
  //token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MDU3MDcxMTN9.jihY0WHC9hmf0V4TXChiVE_UTXSSdUsGNw3If7VHvEs';
  switch (action.type) {
    case 'LOGIN':
      store.dispatch({type: 'LOGIN_LOADING'});

      if (action.email != null && action.password != null) {
        email = action.email.toLowerCase();
        password = action.password;
      } else {
        email = 'rocalilucas@gmail.com';
        password = '12345678';
      }
     

      fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/alert.v1+json',
          'Content-Type': 'application/json',
          'ApiToken': APIToken
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })}).then(response => response.json())
        .then(data => next({
          type: 'LOGIN_RESPONSE',
          data
        }))
        .catch(error => next({
          type: 'LOGIN_ERROR',
          error
        }));
      break;
    case 'GET_EVENTS':
      console.log('FOO');
      // Dispatch GET_MOVIE_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_EVENT_LOADING'});
      console.log('GET_EVENT - TOKEN');
      console.log(token);
      console.log('We have TOKEN!!');
      console.log(token);
      fetch(`${API}/events`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.todos.v1+json',
          'Authorization': token
        }}).then(response => response.json())
        .then(data => next({
          type: 'GET_EVENT_RECEIVED',
          data
        }))
        .catch(error => next({
          type: 'GET_EVENT_ERROR',
          error
        }));
      break;
    case 'GET_ELEMENTS':
      store.dispatch({type: 'GET_ELEMENT_LOADING'});
      fetch(`${API}/elements`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.todos.v1+json',
          'Authorization': token
        }}).then(response => response.json())
        .then(data => next({
          type: 'GET_ELEMENT_RECEIVED',
          data
        }))
        .catch(error => next({
          type: 'GET_ELEMENT_ERROR',
          error
        }));
      break;
    default:
      break;
  }
};

export const reducer = (state = { currentScreen: 'login',logged: false, events: [],elements: [], loading: true }, action) => {
  console.log('reducer');
  // console.log(action);
  // console.log(action.data);
  console.log(action.type);
  switch (action.type) {
    case 'LOGIN_LOADING':
      return{ 
        currentScreen: 'login',
        loading: true,
      }
    case 'LOGIN_RESPONSE':
      token = action.data.auth_token;
      message = action.data.message;
      logged = token != null ? true : false
      return {
        ...state, 
        currentScreen: 'login',
        logged : logged,
        loading: false,
        message: message
      };
    case 'LOGIN_ERROR':
      return{
        ...state, 
        currentScreen: 'login',
        loading: false,
      }
    case 'GET_EVENT_LOADING':
      return {
        ...state, 
        currentScreen: 'events',
        loading: true,
      };
    case 'GET_EVENT_RECEIVED':
      var events = action.data;
      return {
        ...state, 
        currentScreen: 'events',
        loading: false,
        events: events
      };
    case 'GET_EVENT_ERROR':
      console.log(state);
      return state;
    case 'GET_ELEMENT_LOADING':
      return {
        ...state, 
        currentScreen: 'elements',
        loading: true,
      };
    case 'GET_ELEMENT_RECEIVED':
      return {
        ...state, 
        currentScreen: 'elements',
        loading: false,
        elements: action.data,
      };
    case 'GET_ELEMENT_ERROR':
      console.log(state);
      return state;
    default:
      return state;
    }
};
