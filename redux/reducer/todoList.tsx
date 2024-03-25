import produce from '../until/produce';

export const CREATE_ROUTIN = 'CREATE_ROUTIN';

interface Create {
    id: number;
    title: string;
    completed: boolean;
}

const initialState = {
    routin: [],
};

type CreateType = { routin: Create[] };

const createRoutinReducer = (data: Create) => ({
    type: CREATE_ROUTIN,
    payload: produce(initialState, (draft: CreateType) => {
        draft.routin = [
            {
                id: data.id,
                title: data.title,
                completed: false,
            },
        ];
    }),
});

export default createRoutinReducer;
