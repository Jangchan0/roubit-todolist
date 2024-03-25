import produce from '../until/produce';
import { types } from '../constant';

interface Routin {
    id: number;
    title: string;
    completed: boolean;
}

interface RootState {
    routin: Routin[];
}

const initialState: RootState = {
    routin: [],
};

type RoutinAction = {
    type: string;
    payload: Routin;
};

const routinReducer = (state: RootState = initialState, action: RoutinAction) => {
    switch (action.type) {
        case types.CREATE_ROUTIN:
            return produce(state, (draft: { routin: { id: number; title: string; completed: boolean }[] }) => {
                draft.routin.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    completed: false,
                });
            });
        case types.UPDATE_ROUTIN:
            return produce(state, (draft: { routin: { id: number; title: string; completed: boolean }[] }) => {
                draft.routin.map((item: { id: number; title: string; completed: boolean }) => {
                    if (item.id === action.payload.id) {
                        item.title = action.payload.title;
                        item.completed = action.payload.completed;
                    }
                });
            });
        case types.DELETE_ROUTIN:
            return produce(state, (draft: { routin: { id: number; title: string; completed: boolean }[] }) => {
                draft.routin.map((item: { id: number; title: string; completed: boolean }) => {
                    if (item.id === action.payload.id) {
                        draft.routin.splice(draft.routin.indexOf(item), 1);
                    }
                });
            });
        case types.COMPLETED_ROUTIN:
            return produce(state, (draft: { routin: { id: number; title: string; completed: boolean }[] }) => {
                draft.routin.map((item: { id: number; title: string; completed: boolean }) => {
                    if (item.id === action.payload.id) {
                        item.completed = action.payload.completed;
                    }
                });
            });
        default:
            return state;
    }
};

export default routinReducer;
