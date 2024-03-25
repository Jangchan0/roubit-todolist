import { put } from 'redux-saga/effects';

const taker = (actionType, func) =>
    function* (action) {
        try {
            const result = yield func(action);
            yield put({
                type: `${actionType}_SUCCESS`,
                payload: result.data,
            });
        } catch (err) {
            yield put({
                type: `${actionType}_FAILURE`,
                payload: err,
            });
        }
    };

export default taker;
