import produce from './until/produce';

export const initialState = {
    loginLoading: false,
    loginSuccess: false,
    loginError: false,

    logoutLoading: false,
    logoutSuccess: false,
    logoutError: false,

    signUpLoading: false,
    signUpSuccess: false,
    signUpError: false,
};

interface userDraftType {
    loginLoading: boolean;
    loginSuccess: boolean;
    loginError: boolean;
    logoutLoading: boolean;
    logoutSuccess: boolean;
    logoutError: boolean;
    signUpLoading: boolean;
    signUpSuccess: boolean;
    signUpError: boolean;
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export default function reducer(state = initialState, action: { type: string }) {
    return produce(state, (draft: userDraftType) => {
        switch (action.type) {
            case LOGIN_REQUEST:
                draft.loginLoading = true;
                draft.loginSuccess = false;
                draft.loginError = false;
                break;
            case LOGIN_SUCCESS:
                draft.loginLoading = false;
                draft.loginSuccess = true;
                draft.loginError = false;
                break;
            case LOGIN_FAILURE:
                draft.loginLoading = false;
                draft.loginSuccess = false;
                draft.loginError = true;
                break;

            case LOGOUT_REQUEST:
                draft.logoutLoading = true;
                draft.logoutSuccess = false;
                draft.logoutError = false;
                break;
            case LOGOUT_SUCCESS:
                draft.logoutLoading = false;
                draft.logoutSuccess = true;
                draft.logoutError = false;
                break;
            case LOGOUT_FAILURE:
                draft.logoutLoading = false;
                draft.logoutSuccess = false;
                draft.logoutError = true;
                break;

            case SIGNUP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpSuccess = false;
                draft.signUpError = false;
                break;
            case SIGNUP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpSuccess = true;
                draft.signUpError = false;
                break;
            case SIGNUP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpSuccess = false;
                draft.signUpError = true;
                break;

            default:
                break;
        }
    });
}
