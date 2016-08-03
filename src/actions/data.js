import { checkHttpStatus } from '../utils';
import { parseJSON } from '../utils';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {FETCH_PROTECTED_DATA_REQUEST,
        RECEIVE_PROTECTED_DATA,
        ADD_POST_REQUEST,
        ADD_POST_FAILURE,
        ADD_POST_SUCCESS} from '../constants';

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data.posts
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return axios.get('/api/posts')
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response));
            })
            .catch(error => {
                if(error.response.status === 401) {
                   dispatch(loginUserFailure(error));
                   browserHistory.push('/login');
                }
            })
       }
}

export function addPostSuccess() {
    return {
        type: ADD_POST_SUCCESS,
        payload: {
      
        }
    }
}

export function addPostFailure(error) {
    return {
        type: ADD_POST_FAILURE,
        payload: {
            status: error.status,
            statusText: error.statusText
        }
    }
}

export function addPostRequest() {
    return {
        type: ADD_POST_REQUEST
    }
}

export function addPost(title, body, author_id) {
    return function(dispatch) {
        dispatch(addPostRequest());
        return axios.post('/api/addpost', {
                title: title,
                body: body,
                author_id: author_id
            })
            .then(response => {
                try {
                    dispatch(addPostSuccess());
                   
                } catch (e) {
                    dispatch(addPostFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(addPostFailure(error));
            })
    }
}