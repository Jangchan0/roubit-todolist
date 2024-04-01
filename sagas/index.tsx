import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import todoSaga from './todo';

export default function* rootSaga() {
    yield all([fork(userSaga), fork(todoSaga)]);
}
