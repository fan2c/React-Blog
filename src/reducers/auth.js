import {createReducer} from '../utils';
import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';
import {LOGIN_USER_REQUEST,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAILURE,
        LOGOUT_USER} from '../constants';

const initialState = {
    token: null,
    id:null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'userName': jwtDecode(payload.token).username,
            'id': jwtDecode(payload.token).id,
            'statusText': 'You have been successfully logged in.'
        });

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'id': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'id': null,
            'statusText': 'You have been successfully logged out.'
        });
    }
});
