import { AsyncStorage } from 'react-native'

// const API = 'https://rocali-alert-api.herokuapp.com/';
// const APIToken = "JRHApPRyt4CnTTyUUHzC"

const API = 'http://192.168.1.39:3000';
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
          'Accept': 'application/alert.v1+json',
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
    case 'GET_CATEGORIES':
      store.dispatch({type: 'GET_CATEGORY_LOADING'});
      fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
          'Accept': 'application/alert.v1+json',
          'Authorization': token
        }}).then(response => response.json())
        .then(data => next({
          type: 'GET_CATEGORY_RECEIVED',
          data
        }))
        .catch(error => next({
          type: 'GET_CATEGORY_ERROR',
          error
        }));
      break;
    case 'CREATE_EVENT':
      store.dispatch({type: 'CREATE_EVENT_LOADING'});

      console.log("CREATE_EVENT");
      console.log(action);

      lat = action.lat;
      lon = action.lon;
      category_id = action.category.id;


      fetch(`${API}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/alert.v1+json',
          'Authorization': token
        },
        body: JSON.stringify({
          lat: lat,
          lon: lon,
          category_id: category_id,
          importance: 1
        })}).then(response => response.json())
        .then(data => next({
          type: 'CREATE_EVENT_RESPONSE',
          data
        }))
        .catch(error => next({
          type: 'CREATE_EVENT_ERROR',
          error
        }));
      break;
    default:
      break;
  }
};

// const initialState = { 
//   currentScreen: 'login',
//   logged: false, 
//   events: [],
//   categories: [], 
//   loading: true,
//   create_event: { lat:null, lon:null, category: null } 
// };

export const reducer = (state = {}, action) => {
  console.log('reducer');
  // console.log(action);
  // console.log(action.data);
  console.log(action.type);
  switch (action.type) {
    case 'LOGIN_LOADING':
      return{ 
        ...state, 
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
      return {
        ...state, 
        currentScreen: 'events',
        loading: false,
        events: action.data
      };
    case 'GET_EVENT_ERROR':
      console.log(state);
      return state;
    case 'GET_CATEGORY_LOADING':
      return {
        ...state, 
        currentScreen: 'categories',
        loading: true,
      };
    case 'GET_CATEGORY_RECEIVED':
      return {
        ...state, 
        currentScreen: 'categories',
        loading: false,
        categories: action.data,
      };
    case 'GET_CATEGORY_ERROR':
      console.log(state);
      return state;
    // case 'SELECTED_CATEGORY':
    //   console.log('SELECTED_CATEGORY');
    //   return {
    //     ...state,
    //     create_event: {
    //       ...state.create_event,
    //       category: action.category
    //     }
    //   };
    // case 'SET_USER_LOCATION':
    //   console.log('SET_USER_LOCATION');
    //   return {
    //     ...state,
    //     create_event: {
    //       ...state.create_event,
    //       lat: action.lat,
    //       lon: action.lon
    //     }
    //   };
    case 'CREATE_EVENT_LOADING':
      return{ 
        ...state, 
        currentScreen: 'event',
        loading: true,
      }
    case 'CREATE_EVENT_RESPONSE':
      message = action.data.message;
      return {
        ...state, 
        currentScreen: 'event',
        loading: false,
        message: message
      };
    case 'CREATE_EVENT_ERROR':
      return{
        ...state, 
        currentScreen: 'event',
        loading: false,
      }
    default:
      return state;
    }
};
