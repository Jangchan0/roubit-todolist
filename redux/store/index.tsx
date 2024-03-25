import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducer/index';
import rootSaga from '../modules/auth';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore } from 'redux-persist';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
