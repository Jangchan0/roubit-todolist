import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import routin from './routin';

interface RootReducerCombinedStateType {
    user: {};
    routin: {};
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
                user,
                routin,
            });
            return combineReducer(state, action);
        }
    }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
