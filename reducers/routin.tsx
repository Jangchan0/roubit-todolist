import produce from './until/produce';

export const initialState = {
    createTaskLoading: false,
    createTaskSuccess: false,
    createTaskError: null,

    updateTaskLoading: false,
    updateTaskSuccess: false,
    updateTaskError: null,

    deleteTaskLoading: false,
    deleteTaskSuccess: false,
    deleteTaskError: null,

    getRoutinLoading: false,
    getRoutinSuccess: false,
    getRoutinError: null,

    compeleteTaskLoading: false,
    compeleteTaskSuccess: false,
    compeleteTaskError: null,
};

export const CREATE_ROUTIN_REQUEST = 'CREATE_ROUTIN_REQUEST';
export const CREATE_ROUTIN_SUCCESS = 'CREATE_ROUTIN_SUCCESS';
export const CREATE_ROUTIN_FAILURE = 'CREATE_ROUTIN_FAILURE';

export const UPDATE_ROUTIN_REQUEST = 'UPDATE_ROUTIN';
export const UPDATE_ROUTIN_SUCCESS = 'UPDATE_ROUTIN_SUCCESS';
export const UPDATE_ROUTIN_FAILURE = 'UPDATE_ROUTIN_FAILURE';

export const DELETE_ROUTIN_REQUEST = 'DELETE_ROUTIN';
export const DELETE_ROUTIN_SUCCESS = 'DELETE_ROUTIN_SUCCESS';
export const DELETE_ROUTIN_FAILURE = 'DELETE_ROUTIN_FAILURE';

export const COMPLETED_ROUTIN_REQUEST = 'COMPLETED_ROUTIN';
export const COMPLETED_ROUTIN_SUCCESS = 'COMPLETED_ROUTIN_SUCCESS';
export const COMPLETED_ROUTIN_FAILURE = 'COMPLETED_ROUTIN_FAILURE';

export const GET_ROUTIN_REQUEST = 'GET_ROUTIN_REQUEST';
export const GET_ROUTIN_SUCCESS = 'GET_ROUTIN_SUCCESS';
export const GET_ROUTIN_FAILURE = 'GET_ROUTIN_FAILURE';

export default function reducer(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case CREATE_ROUTIN_REQUEST:
                draft.createTaskLoading = true;
                draft.createTaskSuccess = false;
                draft.createTaskError = null;
                break;
            case CREATE_ROUTIN_SUCCESS:
                draft.createTaskLoading = false;
                draft.createTaskSuccess = true;
                draft.createTaskError = null;
                break;
            case CREATE_ROUTIN_FAILURE:
                draft.createTaskLoading = false;
                draft.createTaskSuccess = false;
                draft.createTaskError = action.payload;
                break;

            case UPDATE_ROUTIN_REQUEST:
                draft.updateTaskLoading = true;
                draft.updateTaskSuccess = false;
                draft.updateTaskError = null;
                break;
            case UPDATE_ROUTIN_SUCCESS:
                draft.updateTaskLoading = false;
                draft.updateTaskSuccess = true;
                draft.updateTaskError = null;
                break;
            case UPDATE_ROUTIN_FAILURE:
                draft.updateTaskLoading = false;
                draft.updateTaskSuccess = false;
                draft.updateTaskError = action.payload;
                break;

            case DELETE_ROUTIN_REQUEST:
                draft.deleteTaskLoading = true;
                draft.deleteTaskSuccess = false;
                draft.deleteTaskError = null;
                break;
            case DELETE_ROUTIN_SUCCESS:
                draft.deleteTaskLoading = false;
                draft.deleteTaskSuccess = true;
                draft.deleteTaskError = null;
                break;
            case DELETE_ROUTIN_FAILURE:
                draft.deleteTaskLoading = false;
                draft.deleteTaskSuccess = false;
                draft.deleteTaskError = action.payload;
                break;

            case COMPLETED_ROUTIN_REQUEST:
                draft.compeleteTaskLoading = true;
                draft.compeleteTaskSuccess = false;
                draft.compeleteTaskError = null;
                break;
            case COMPLETED_ROUTIN_SUCCESS:
                draft.compeleteTaskLoading = false;
                draft.compeleteTaskSuccess = true;
                draft.compeleteTaskError = null;
                break;
            case COMPLETED_ROUTIN_FAILURE:
                draft.compeleteTaskLoading = false;
                draft.compeleteTaskSuccess = false;
                draft.compeleteTaskError = action.payload;
                break;

            case GET_ROUTIN_REQUEST:
                draft.getRoutinLoading = true;
                draft.getRoutinSuccess = false;
                draft.getRoutinError = null;
                break;
            case GET_ROUTIN_SUCCESS:
                draft.getRoutinLoading = false;
                draft.getRoutinSuccess = true;
                draft.getRoutinError = null;
                break;
            case GET_ROUTIN_FAILURE:
                draft.getRoutinLoading = false;
                draft.getRoutinSuccess = false;
                draft.getRoutinError = action.payload;
                break;

            default:
                break;
        }
    });
}
