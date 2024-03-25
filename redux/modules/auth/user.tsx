'use client';

import { all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import taker from './taker';
import { types } from './constant';

const login = function* (action) {
    return yield axios.post('/user/login', action.payload);
};
const logout = function* () {
    return yield axios.post('/user/logout');
};

export default function* userSaga() {
    yield all([
        takeLatest(types.LOGIN_REQUEST, taker(types.LOGOUT_REQUEST, login)),
        takeLatest(types.LOGOUT_REQUEST, taker(types.LOGOUT_REQUEST, logout)),
    ]);
}
