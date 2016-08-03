import { checkHttpStatus } from '../utils';
import { parseJSON } from '../utils';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import {LOGIN_USER_REQUEST,
        LOGIN_USER_FAILURE,
        LOGIN_USER_SUCCESS,
        LOGOUT_USER} from '../constants'

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.status,
      statusText: error.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout())
        browserHistory.push('/')
    }
}

export function loginUser(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return axios.post('/api/login', {
                email: email,
                password: password
            })
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    browserHistory.push('/main');
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}