import {createReducer} from '../utils';
import {RECEIVE_PROTECTED_DATA,
        FETCH_PROTECTED_DATA_REQUEST,
        ADD_POST_REQUEST,
        ADD_POST_SUCCESS,
        ADD_POST_FAILURE} from '../constants';


const initialState = {
    data: [],
    isFetching: false,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            'data': payload.data,
            'isFetching': false
        });
    },
    [FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    },
    [ADD_POST_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [ADD_POST_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'statusText': 'You have been successfully updata.'
        });

    },
    [ADD_POST_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    }
});
