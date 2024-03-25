import { combineReducers } from 'redux';
import routinReducer from './todoList';

const rootReducer = combineReducers({
    routin: routinReducer,
});

export default rootReducer;
