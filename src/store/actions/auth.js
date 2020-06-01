import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const getUser = (user) => {
    return {
        type: actionTypes.GET_USER,
        name: user
    }    
};

export const getMe = () => {
    return dispatch => {
        axios.get('http://localhost:3000/me', { withCredentials: true })
        .then(response => {
            const user = response.data.data.user.name; 
            dispatch(getUser(user));
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const clientEdit = (rowData) => {
    return {
        type: actionTypes.CLIENT_EDIT,
        clientData: rowData
    };
};

export const deleteClientStore = () => {
    return {
        type: actionTypes.DELETE_CLIENT_STORE
    };
};

export const deleteClient = (clientId, history) => {
    return dispatch => {
        const URL = 'http://localhost:3000/client/' + clientId;
        axios.delete(URL, null, { withCredentials: true })
        .then(response => {
            dispatch(deleteClientStore());
            history.push('/dashboard/clients');
        })
        .catch(error => {
            dispatch(authFail(error));
        })
    };
};

export const rowSelect = (rowData, history) => {
    return dispatch => {
        dispatch(clientEdit(rowData));
        history.push('/dashboard/editclient');
    };
};

export const signOut = () => {
    return dispatch => {
        axios.post('http://localhost:3000/account/signout', null, { withCredentials: true })
        .then(response => {
            dispatch(logout());
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
            dispatch(getMe());
            history.push('/dashboard');
        })
        .catch(error => {
            dispatch(authFail(error.response.data));
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
            dispatch(authFail(error.response.data.errors[0].msg));
        })
    };
};

export const authCheckState = () => {
    return dispatch => {
        let cookie = document.cookie.includes('isAuthenticated');
        if (cookie) {
            dispatch(authSuccess());
            dispatch(getMe());
        }
    };
};
