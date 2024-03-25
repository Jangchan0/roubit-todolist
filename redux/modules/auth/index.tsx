import { takeLatest, call, put, all } from 'redux-saga/effects';
import { types } from './constant';
import fetchData from '@/hooks/Fetch';

function* login(action) {
    try {
        const response = yield call(fetchData, 'post', '/login', action.payload);
        yield put({ type: types.LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: types.LOGIN_FAILURE, payload: error });
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
