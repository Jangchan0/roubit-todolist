import { types } from '../../constant';

export function loginRequest() {
    return {
        type: types.LOGIN_REQUEST,
    };
}

export function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS,
        data,
    };
}

export function loginFailure(error: Error) {
    return {
        type: types.LOGIN_FAILURE,
        error,
    };
}

export function logoutRequest() {
    return {
        type: types.LOGOUT_REQUEST,
    };
}

export function logoutSuccess(data) {
    return {
        type: types.LOGOUT_SUCCESS,
        data,
    };
}

export function logoutFailure(error: Error) {
    return {
        type: types.LOGOUT_FAILURE,
        error,
    };
}
