import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all } from 'redux-saga/effects';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const rootReducer = combineReducers({});

export function* rootSaga() {
    yield all([]);
}

export default persistReducer(persistConfig, rootReducer);
