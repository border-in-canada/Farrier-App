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

export const auth = (formData, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:3000/account/signin', formData, { withCredentials: true })
        .then(response => {
            dispatch(authSuccess(response.data.authToken, history));
            //const expirationDate = newDate(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("authToken", response.data.authToken);
            history.push('/dashboard');
            //localStorage.setItem("expirationDate", expirationDate)
        })
        .catch(error => {
            console.log('Error on Submission');
            dispatch(authFail(error));
        })
    };
};