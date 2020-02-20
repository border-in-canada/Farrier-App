import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authToken: authToken
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return dispatch => {
        axios.post('http://localhost:3000/account/signout', { withCredentials: true })
        .then(response => {
            return{
                type: actionTypes.AUTH_LOGOUT
            }
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const requestPasswordReset = (formData, history) => {
    return dispatch => {
        axios.post('http://localhost:3000/account/requestreset', formData, { withCredentials: true })
        .then(response => {
            history.push('/');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const addClient = (data, history) => {
    return dispatch => {
        axios.post('http://localhost:3000/client', data, { withCredentials: true })
        .then(response => {
            history.push('/dashboard/clients');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const passwordReset = (formData, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:3000/account/resetpassword', formData, { withCredentials: true })
        .then(response => {
            dispatch(authSuccess());
            history.push('/dashboard');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const auth = (formData, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:3000/account/signin', formData, { withCredentials: true })
        .then(response => {
            dispatch(authSuccess());
            history.push('/dashboard');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const signupAuth = (formData, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:3000/account/signup', formData, { withCredentials: true })
        .then(response => {
            dispatch(authSuccess());
            history.push('/dashboard');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

