import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import { SagaResponseType } from '@/app/types/common';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
} from '../reducers/user';
import { NextRouter } from 'next/router';

import signUpMutation, { ReturnSignUpResponseType, SignUpResponse } from '@/graphQLMutation/signUpMutation';
import signInMutation, { ReturnAccessTokenType, SignInResponse } from '@/graphQLMutation/loginMutation';

type SignUpInput = {
    email: string;
    password: string;
    fullName: string;
    username: string;
};

type signUpActionArgumentsTypes = {
    data: SignUpInput;
    router: NextRouter;
    type: string;
};

type loginInput = Pick<SignUpInput, 'email' | 'password'>;

type loginActionArgumentsTypes = {
    data: loginInput;
    router: NextRouter;
    type: string;
};

function* login(
    action: loginActionArgumentsTypes
): SagaResponseType<SignInResponse<ReturnAccessTokenType>, { type: string; payload?: unknown }> {
    try {
        const result = yield call(signInMutation, action.data);
        if (result.signIn.status === 200) {
            yield put({ type: LOGIN_SUCCESS });
            localStorage.setItem('todoAccessToken', result.signIn.data.accessToken);
            yield call(action.router.push, '/');
        } else {
            alert(result.signIn.message);
            throw new Error(result.signIn.message);
        }
    } catch (err: unknown) {
        yield put({ type: LOGIN_FAILURE });
    }
}

function* signUp(
    action: signUpActionArgumentsTypes
): SagaResponseType<SignUpResponse<ReturnSignUpResponseType>, { type: string; payload?: unknown }> {
    try {
        const result = yield call(signUpMutation, action.data);
        if (result.signUp.data && result.signUp.data.email === action.data.email) {
            yield put({ type: SIGNUP_SUCCESS });
            alert('회원가입을 축하합니다! 같이 더욱 부지런해져봐요!');
            yield call(action.router.push, '/auth/signIn');
        } else {
            alert(result.signUp.message);
            throw new Error(result.signUp.message);
        }
    } catch (err) {
        yield put({ type: SIGNUP_FAILURE, payload: err });
    }
}

function* watchSignUp() {
    yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
}

export default function* userSaga() {
    yield all([fork(watchSignUp), fork(watchLogin)]);
}
