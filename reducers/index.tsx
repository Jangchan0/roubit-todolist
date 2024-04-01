import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { TodoInitialStateType } from './todo';
import { UserInitalState } from './user';

import user from './user';
import todo from './todo';

interface RootReducerCombinedStateType {
    user: UserInitalState;
    todo: TodoInitialStateType;
}
interface RootReducerActionType {
    type: string;
    payload: UserInitalState;
}

const rootReducer = (state: RootReducerCombinedStateType, action: RootReducerActionType) => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                user,
                todo,
            });
            return combineReducer(state, action);
        }
    }
};

export type RootState = RootReducerCombinedStateType;

export default rootReducer;
