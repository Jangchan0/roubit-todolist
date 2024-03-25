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

export const createRoutinReducer = (data: Routin) => ({
    type: types.CREATE_ROUTIN,
    payload: data,
});
export const updateRoutinReducer = (data: Routin) => ({
    type: types.UPDATE_ROUTIN,
    payload: data,
});
export const deleteRoutinReducer = (data: Routin) => ({
    type: types.DELETE_ROUTIN,
    payload: data,
});
export const completedRoutinReducer = (data: Routin) => ({
    type: types.COMPLETED_ROUTIN,
    payload: data,
});
