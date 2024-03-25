import { all, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import taker from './taker';
import { types } from '../../constant';

const login = function* (action) {
    try {
        const response: AxiosResponse<any> = yield axios.post('/user/login', action.payload);
        return response.data; // 응답 데이터 반환
    } catch (error) {
        throw error;
    }
};

const logout = function* () {
    try {
        const response: AxiosResponse<any> = yield axios.post('/user/logout');
        return response.data; // 응답 데이터 반환
    } catch (error) {
        throw error;
    }
};

export default function* userSaga() {
    yield all([
        takeLatest(types.LOGIN_REQUEST, taker(types.LOGOUT_REQUEST, login)),
        takeLatest(types.LOGOUT_REQUEST, taker(types.LOGOUT_REQUEST, logout)),
    ]);
}
