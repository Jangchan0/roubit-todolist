import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
} from '../reducers/user';
import { NextRouter } from 'next/router';

import signUpMutation from '@/hooks/signUpMutation';
import signInMutation from '@/hooks/loginMutation';

type loginInput = {
    email: string;
    password: string;
};

type loginActionArgumentsTypes = {
    data: loginInput;
    router: NextRouter;
    type: string;
};

function* login(action: loginActionArgumentsTypes) {
    try {
        const result = yield call(signInMutation, action.data);
        if (result.signIn.status === 200) {
            yield put({ type: LOGIN_SUCCESS });
            localStorage.setItem('todoAccressToken', result.signIn.data.accessToken);
            yield call(action.router.push, '/todos');
        } else {
            alert(result.signIn.message);
            throw new Error(result.signIn.message);
        }
    } catch (err) {
        yield put({ type: LOGIN_FAILURE, payload: err });
    }
}

// function* logout(action) {
//     try {
//         const result = yield call(signUp, action.data);
//         yield put({ type: LOGOUT_SUCCESS });
//     } catch (err) {
//         yield put({ type: LOGOUT_FAILURE, payload: err });
//     }
// })

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

function* signUp(action: signUpActionArgumentsTypes) {
    try {
        const result = yield call(signUpMutation, action.data);
        if (result.signUp.status === 200) {
            yield put({ type: SIGNUP_SUCCESS });
            alert('회원가입을 축하합니다! 같이 더욱 부지런해져봐요!');
            yield call(action.router.push, '/auth/signIn');
        } else {
            alert(result.signUp.message);
            throw new Error();
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
