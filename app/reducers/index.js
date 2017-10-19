import { AsyncStorage } from 'react-native'

// const API = 'https://rocali-alert-api.herokuapp.com/';
// const APIToken = "JRHApPRyt4CnTTyUUHzC"

const API = 'http://192.168.1.35:3000';
const APIToken = "Me4brAzf2yzxzhHTtDs2"

token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMiwiZXhwIjoxNTA4NDYxOTUyfQ.AElBPfuJgp3gXcE6_d60mXYyaQ4IEn1H42BhDJ6XyfY';
export const apiMiddleware = store => next => action => {
  next(action);
  //token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MDU3MDcxMTN9.jihY0WHC9hmf0V4TXChiVE_UTXSSdUsGNw3If7VHvEs';
  switch (action.type) {
    case 'LOGIN':
      store.dispatch({type: 'LOGIN_LOADING'});

      if (action.email != null && action.password != null && action.email != "" && action.password != "") {
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
    case 'SIGNUP':
      store.dispatch({type: 'SIGNUP_LOADING'});

      name = action.name;
      email = action.email.toLowerCase();
      password = action.password;
      password_confirmation = action.password_confirmation;

      fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/alert.v1+json',
          'Content-Type': 'application/json',
          'ApiToken': APIToken
        },
        body: JSON.stringify({
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          user_info_attributes: {
            name: name,
          }
        })}).then(response => response.json())
        .then(data => next({
          type: 'SIGNUP_RESPONSE',
          data
        }))
        .catch(error => next({
          type: 'SIGNUP_ERROR',
          error
        }));
      break;
    case 'GET_EVENTS':

      store.dispatch({type: 'GET_EVENT_LOADING'});

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
    case 'GET_TAGS':
      store.dispatch({type: 'GET_TAG_LOADING'});
      fetch(`${API}/tags`, {
        method: 'GET',
        headers: {
          'Accept': 'application/alert.v1+json',
          'Authorization': token
        }}).then(response => response.json())
        .then(data => next({
          type: 'GET_TAG_RECEIVED',
          data
        }))
        .catch(error => next({
          type: 'GET_TAG_ERROR',
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
      tag_ids = action.tags.map(tag => tag.id);

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
          tag_ids: tag_ids,
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
    case 'CREATE_TAG':
      store.dispatch({type: 'CREATE_TAG_LOADING'});

      console.log("CREATE_TAG");
      console.log(action);

      tag_name = action.tag_name;

      fetch(`${API}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/alert.v1+json',
          'Authorization': token
        },
        body: JSON.stringify({
          name: tag_name,
        })}).then(response => response.json())
        .then(data => next({
          type: 'CREATE_TAG_RESPONSE',
          data
        }))
        .catch(error => next({
          type: 'CREATE_TAG_ERROR',
          error
        }));
      break;
    case 'SET_STRENGTH':
      store.dispatch({type: 'CREATE_EVENT_LOADING'});

      console.log("SET_STRENGTH");
      console.log(action);

      event_id = action.event_id;
      up_down = action.up_down;

      fetch(`${API}/strengths`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/alert.v1+json',
          'Authorization': token
        },
        body: JSON.stringify({
          event_id: event_id,
          up_down: up_down
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
    case 'SIGNUP_LOADING':
      return{ 
        ...state, 
        currentScreen: 'signup',
        loading: true,
      }
    case 'SIGNUP_RESPONSE':
      token = action.data.auth_token;
      message = action.data.message;
      success = token != null ? true : false
      return {
        ...state, 
        currentScreen: 'signup',
        success : success,
        loading: false,
        message: message
      };
    case 'SIGNUP_ERROR':
      return{
        ...state, 
        currentScreen: 'signup',
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
    case 'GET_TAG_LOADING':
      return {
        ...state, 
        currentScreen: 'tags',
        loading: true,
        success: false
      };
    case 'GET_TAG_RECEIVED':
      return {
        ...state, 
        currentScreen: 'tags',
        loading: false,
        tags: action.data,
        success: false
      };
    case 'GET_TAG_ERROR':
      return state;
    case 'CREATE_TAG_LOADING':
      return{ 
        ...state, 
        currentScreen: 'tags',
        loading: true,
        success: false
      }
    case 'CREATE_TAG_RESPONSE':
      message = action.data.message;
      success = message == null ? true : false;
      return {
        ...state, 
        currentScreen: 'tags',
        loading: false,
        message: message,
        success: success
      };
    case 'CREATE_TAG_ERROR':
      return{
        ...state, 
        currentScreen: 'tags',
        loading: false,
        success: false
      }
    case 'CREATE_EVENT_LOADING':
      return{ 
        ...state, 
        currentScreen: 'event',
        loading: true,
      }
    case 'CREATE_EVENT_RESPONSE':
      message = action.data.message;
      success = message == null ? true : false;
      return {
        ...state, 
        currentScreen: 'event',
        loading: false,
        message: message,
        success: success
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
