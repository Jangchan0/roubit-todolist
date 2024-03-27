import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/index';
import rootSaga from '../sagas';
import logger from 'redux-logger';

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares: Middleware[] = [sagaMiddleware, logger];
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? applyMiddleware(...middlewares)
            : composeWithDevTools(applyMiddleware(...middlewares));

    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});
