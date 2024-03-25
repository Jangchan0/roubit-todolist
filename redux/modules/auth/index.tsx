import { takeLatest, put } from 'redux-saga/effects';
import { types } from '../../constant';
import fetchData from '@/hooks/Fetch';

function* login(action) {
    try {
        const response = yield fetchData('post', '/login', action.payload);
        yield put({ type: types.LOGIN_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: types.LOGIN_FAILURE, payload: error });
    }
}

function* logout() {
    try {
        const response = yield fetchData('post', '/logout');
        yield put({ type: types.LOGOUT_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: types.LOGOUT_FAILURE, payload: error });
    }
}

function* watchLogin() {
    yield takeLatest(types.LOGIN_REQUEST, login);
}

function* watchLogout() {
    yield takeLatest(types.LOGOUT_REQUEST, logout);
}

export default function* rootSaga() {
    yield all([watchLogin(), watchLogout()]);
}
