import produce from './until/produce';

export const TodoInitialState = {
    createTaskLoading: false,
    createTaskSuccess: false,
    createTaskError: null,

    updateTaskLoading: false,
    updateTaskSuccess: false,
    updateTaskError: null,

    deleteTaskLoading: false,
    deleteTaskSuccess: false,
    deleteTaskError: null,

    getTodoLoading: false,
    getTodoSuccess: {
        todolist: {
            status: null,
            data: { todolist: [] },
            message: '',
        },
    },
    getTodoError: null,

    compeleteTaskLoading: false,
    compeleteTaskSuccess: false,
    compeleteTaskError: null,

    openModal: false,
    openModalSuccess: {
        id: '',
        title: '',
    },
};

type todoDraftType = {
    createTaskLoading: boolean;
    createTaskSuccess: boolean;
    createTaskError: null | {};

    updateTaskLoading: boolean;
    updateTaskSuccess: boolean;
    updateTaskError: null | {};

    deleteTaskLoading: boolean;
    deleteTaskSuccess: boolean;
    deleteTaskError: null | {};

    getTodoLoading: boolean;
    getTodoSuccess: boolean | {};
    getTodoError: null | {};

    compeleteTaskLoading: boolean;
    compeleteTaskSuccess: boolean;
    compeleteTaskError: null | {};

    openModal: boolean;
    openModalSuccess: {};
};

export type TodoInitialStateType = typeof TodoInitialState;

export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const COMPLETED_TODO_REQUEST = 'COMPLETED_TODO';
export const COMPLETED_TODO_SUCCESS = 'COMPLETED_TODO_SUCCESS';
export const COMPLETED_TODO_FAILURE = 'COMPLETED_TODO_FAILURE';

export const GET_TODO_REQUEST = 'GET_TODO_REQUEST';
export const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS';
export const GET_TODO_FAILURE = 'GET_TODO_FAILURE';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = () => ({
    type: OPEN_MODAL,
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});

export default function reducer(state = TodoInitialState, action: { type: string; payload: {} }) {
    return produce(state, (draft: todoDraftType) => {
        switch (action.type) {
            case CREATE_TODO_REQUEST:
                draft.createTaskLoading = true;
                draft.createTaskSuccess = false;
                draft.createTaskError = null;
                break;
            case CREATE_TODO_SUCCESS:
                draft.createTaskLoading = false;
                draft.createTaskSuccess = true;
                draft.createTaskError = null;
                break;
            case CREATE_TODO_FAILURE:
                draft.createTaskLoading = false;
                draft.createTaskSuccess = false;
                draft.createTaskError = action.payload;
                break;

            case UPDATE_TODO_REQUEST:
                draft.updateTaskLoading = true;
                draft.updateTaskSuccess = false;
                draft.updateTaskError = null;
                break;
            case UPDATE_TODO_SUCCESS:
                draft.updateTaskLoading = false;
                draft.updateTaskSuccess = true;
                draft.updateTaskError = null;
                break;
            case UPDATE_TODO_FAILURE:
                draft.updateTaskLoading = false;
                draft.updateTaskSuccess = false;
                draft.updateTaskError = action.payload;
                break;

            case DELETE_TODO_REQUEST:
                draft.deleteTaskLoading = true;
                draft.deleteTaskSuccess = false;
                draft.deleteTaskError = null;
                break;
            case DELETE_TODO_SUCCESS:
                draft.deleteTaskLoading = false;
                draft.deleteTaskSuccess = true;
                draft.deleteTaskError = null;
                break;
            case DELETE_TODO_FAILURE:
                draft.deleteTaskLoading = false;
                draft.deleteTaskSuccess = false;
                draft.deleteTaskError = action.payload;
                break;

            case COMPLETED_TODO_REQUEST:
                draft.compeleteTaskLoading = true;
                draft.compeleteTaskSuccess = false;
                draft.compeleteTaskError = null;
                break;
            case COMPLETED_TODO_SUCCESS:
                draft.compeleteTaskLoading = false;
                draft.compeleteTaskSuccess = true;
                draft.compeleteTaskError = null;
                break;
            case COMPLETED_TODO_FAILURE:
                draft.compeleteTaskLoading = false;
                draft.compeleteTaskSuccess = false;
                draft.compeleteTaskError = action.payload;
                break;

            case GET_TODO_REQUEST:
                draft.getTodoLoading = true;
                draft.getTodoSuccess = false;
                draft.getTodoError = null;
                break;
            case GET_TODO_SUCCESS:
                draft.getTodoLoading = false;
                draft.getTodoSuccess = action.payload;
                draft.getTodoError = null;
                break;
            case GET_TODO_FAILURE:
                draft.getTodoLoading = false;
                draft.getTodoSuccess = false;
                draft.getTodoError = action.payload;
                break;

            case OPEN_MODAL:
                draft.openModal = true;
                draft.openModalSuccess = action.payload;
                break;
            case CLOSE_MODAL:
                draft.openModal = false;
                draft.openModalSuccess = false;
                break;

            default:
                break;
        }
    });
}
