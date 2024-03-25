import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from './constant';
import fetchData from '@/hooks/Fetch';

function* login(action) {
    try {
        const response = yield call(fetchData, 'post', '/login', action.payload);
        yield put({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, payload: error });
    }
}

function* logout() {
    try {
        const response = yield call(fetchData, 'post', '/logout');
        yield put({ type: LOGOUT_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: LOGOUT_FAILURE, payload: error });
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* rootSaga() {
    yield all([watchLogin(), watchLogout()]);
}
