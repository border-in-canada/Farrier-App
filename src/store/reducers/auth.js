import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isAuthenticated: false,
    error: '',
    loading: false,
    user: '',
    clientEditdata: null
};

const authStart = ( state, action ) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = ( state, action ) => {
    return updateObject(state, { 
        isAuthenticated: true,
        error: null,
        loading: false
    });
}

const authFail = ( state, action ) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {isAuthenticated: false, user: ''});
}

const getUsername = (state, action) => {
    return updateObject( state, {
        user: action.name
    });
}

const clientEdit = ( state, action ) => {
    return updateObject( state, {
        clientEditData: action.clientData,
        loading: false
    });
}

const deleteClientStore = ( state, action ) => {
    return updateObject( state, {
        clientEditData: null,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.GET_USER: return getUsername(state, action);
        case actionTypes.CLIENT_EDIT: return clientEdit(state, action);
        case actionTypes.DELETE_CLIENT_STORE: return deleteClientStore(state, action);
        default:
            return state;
            
    }
};

export default reducer;