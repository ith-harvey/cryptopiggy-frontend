
import axios from 'axios'
import { browserHistory } from 'react-router';

export const AUTH_USER = 'auth_user',
             UNAUTH_USER = 'unauth_user',
             AUTH_ERROR = 'auth_error',
             FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
             RESET_PASSWORD_REQUEST = 'reset_password_request',
             PROTECTED_TEST = 'protected_test',
             ADDRESS_FETCHED = 'address_fetched',
             ADDRESS_ERROR = 'address_error';

const ROOT_URL = 'http://localhost:3000'

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data){
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }
  if(error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ username, password }, callback) {
  return function(dispatch) {
    axios({
      method: 'post',
      url: `${ROOT_URL}/auth/signin`,
      data: { username, password }
    }).then(response => {
      dispatch({ type: AUTH_USER }); //setting state (Redux's Style)
      localStorage.setItem('jwtToken', response.data.token);
      callback()
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
    }
}

export function registerUser({ username, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/auth/signup`, { username, password })
    .then(response => {
      dispatch({ type: AUTH_USER }); //setting state (Redux's Style)
      localStorage.setItem('jwtToken', response.data.token);
      window.location.href = CLIENT_ROOT_URL;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser(callback) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    localStorage.removeItem('jwtToken');
    callback()
  }
}

export function protectedTest() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/protected`, {
      headers: { 'Authorization': 'personal note token should be here'}
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function addAddress({ address }, callback) {
  return function(dispatch) {
    let token = localStorage.getItem('jwtToken')
    axios.post(`${ROOT_URL}/address`, { address, token })
    .then(response => {
      callback() // runs fetchAddresses
    })
    .catch((error) => {
      console.log(error)
      errorHandler(dispatch, error.response, ADDRESS_ERROR)
    });
  }
}

export function fetchAddresses() {
  return function(dispatch) {
    let token = localStorage.getItem('jwtToken')
    axios.post(`${ROOT_URL}/address/user`, { token })
    .then(response => {
      dispatch({
        type: ADDRESS_FETCHED,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log(error)
      errorHandler(dispatch, error.response, ADDRESS_ERROR)
    });
  }
}

export function deleteAddress(id, callback) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/address/${id}`)
    .then(response => {
      console.log('response from serv', response)
      callback() // runs fetchAddresses
    })
    .catch((error) => {
      console.log(error)
      errorHandler(dispatch, error.response, ADDRESS_ERROR)
    });
  }
}
