import axios from 'axios';

const tokenConfig = function (token) {
    return {
        headers: {
            'Authorization': token
        }
    }
};

export function validate_token(token) {
    return axios.post('/api/is_token_valid', {
        token: token,
    })
}

export function get_token(email, password) {
    return axios.post('api/v1.0/get_token', {
        email: email,
        password: password
    })
}