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
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiryDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch (logout());
        }, expirationTime);
    }
}

export const auth = (formData, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:3000/account/signin', formData, { withCredentials: true })
        .then(response => {
            dispatch(authSuccess(response.data.authToken, history));
            dispatch(checkAuthTimeout(response.data.authToken.expires_in))
            const expiryDate = new Date(new Date().getTime() + response.data.authToken.expires_in);
            localStorage.setItem('authToken', response.data.authToken.access_token);
            localStorage.setItem('expiryDate', expiryDate)
            history.push('/dashboard');
        })
        .catch(error => {
            console.log('Error on Submission');
            dispatch(authFail(error));
        })
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expiryDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
            }
        }
    };
};