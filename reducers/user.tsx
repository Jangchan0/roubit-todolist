import produce from './until/produce';

export const UserInitalState = {
    loginLoading: false,
    loginSuccess: false,
    loginError: false,

    signUpLoading: false,
    signUpSuccess: false,
    signUpError: false,
};

type userDraftType = {
    loginLoading: boolean;
    loginSuccess: boolean;
    loginError: boolean;

    signUpLoading: boolean;
    signUpSuccess: boolean;
    signUpError: boolean;
};

export type UserInitalState = typeof UserInitalState;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const ROUTER_PUSH = 'ROUTER_PUSH';

export default function reducer(state = UserInitalState, action: { type: string; payload: string }) {
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
