import { all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import taker from './taker';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from './constant';

const login = function* (action) {
    return yield axios.post('/user/login', action.payload);
};
const logout = function* () {
    return yield axios.post('/user/logout');
};

export default function* userSaga() {
    yield all([
        takeLatest(LOGIN_REQUEST, taker(LOGOUT_REQUEST, login)),
        takeLatest(LOGOUT_REQUEST, taker(LOGOUT_REQUEST, logout)),
    ]);
}
