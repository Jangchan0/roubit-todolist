import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { TodoInitialStateType } from './todo';

import todo from './todo';

interface RootReducerCombinedStateType {
    todo: TodoInitialStateType;
}
interface RootReducerActionType {
    type: string;
    payload: {};
}

const rootReducer = (state: RootReducerCombinedStateType, action: RootReducerActionType) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                todo,
            });
            return combineReducer(state, action);
        }
    }
};

export type RootState = RootReducerCombinedStateType;

export default rootReducer;
