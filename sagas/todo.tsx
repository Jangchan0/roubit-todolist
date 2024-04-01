import {
    CREATE_TODO_REQUEST,
    CREATE_TODO_FAILURE,
    CREATE_TODO_SUCCESS,
    GET_TODO_REQUEST,
    GET_TODO_SUCCESS,
    GET_TODO_FAILURE,
    COMPLETED_TODO_REQUEST,
    COMPLETED_TODO_SUCCESS,
    COMPLETED_TODO_FAILURE,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE,
    UPDATE_TODO_REQUEST,
    closeModal,
} from '@/reducers/todo';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import createTodoMutation, { CreateTaskResponse } from '@/graphQLMutation/createTodoMutation';
import getTodoListMutation, { GetTodoListResponse } from '@/graphQLMutation/getUserTodoMutation';
import completedTaskMutation, { CompletedTaskResponse } from '@/graphQLMutation/completedTaskMutation';
import deleteTodoMutation, { DeleteTaskResponse } from '@/graphQLMutation/deletedTaskMutation';
import updateTaskMutation, { UpdateTaskResponse } from '@/graphQLMutation/updateTaskMutation';
import { SagaResponseType, TaskType } from '@/app/types/common';

type CreateTodo = Pick<TaskType, 'title'>;

interface CreateTodoActionTypes {
    type: string;
    data: CreateTodo;
}

interface CompletedTaskActionTypes {
    type: string;
    data: TaskType;
}

type DeletedTask = Pick<TaskType, 'id'>;

interface DeletedTaskActionTypes {
    type: string;
    data: DeletedTask;
}

type UpdateTask = Omit<TaskType, 'completed'>;

interface UpdateTaskActionTypes {
    type: string;
    data: UpdateTask;
}

function* getTodoList(): SagaResponseType<GetTodoListResponse<TaskType>, { type: string; payload: {} | unknown }> {
    try {
        const result = yield call(getTodoListMutation);
        if (result.todolist.status === 200) {
            yield put({ type: GET_TODO_SUCCESS, payload: result });
        } else {
            alert('할 일 추가에 실패했습니다.. 다시 시도해주세요!');
            throw new Error(result.todolist.message);
        }
    } catch (err) {
        yield put({ type: GET_TODO_FAILURE, payload: err });
    }
}

function* createTodo(
    action: CreateTodoActionTypes
): SagaResponseType<CreateTaskResponse<TaskType>, { type: string; payload?: unknown }> {
    try {
        const result = yield call(createTodoMutation, action.data);
        if (result.createTodoList.status === 200) {
            yield put({ type: CREATE_TODO_SUCCESS });
            yield put({ type: GET_TODO_REQUEST });
        } else {
            alert(result.createTodoList.message);
            throw new Error(result.createTodoList.message);
        }
    } catch (error) {
        yield put({ type: CREATE_TODO_FAILURE, payload: error });
    }
}

function* completedTask(
    action: CompletedTaskActionTypes
): SagaResponseType<CompletedTaskResponse<TaskType>, { type: string; payload?: boolean | unknown }> {
    try {
        const result = yield call(completedTaskMutation, action.data);
        if (result.updateTodolistCompleted.status === 200) {
            yield put({ type: COMPLETED_TODO_SUCCESS });
            yield put({ type: GET_TODO_REQUEST });
        } else {
            alert(result.updateTodolistCompleted.message);
            throw new Error(result.updateTodolistCompleted.message);
        }
    } catch (error) {
        yield put({ type: COMPLETED_TODO_FAILURE, payload: error });
    }
}

function* deleteTask(
    action: DeletedTaskActionTypes
): SagaResponseType<DeleteTaskResponse<TaskType>, { type: string; payload?: unknown }> {
    try {
        const result = yield call(deleteTodoMutation, action.data);
        if (result.deletedTodolist.status === 200) {
            yield put({ type: DELETE_TODO_SUCCESS });
            yield put({ type: GET_TODO_REQUEST });
        } else {
            alert(result.deletedTodolist.message);
            throw new Error(result.deletedTodolist.message);
        }
    } catch (error) {
        yield put({ type: DELETE_TODO_FAILURE, payload: error });
    }
}

function* updateTask(
    action: UpdateTaskActionTypes
): SagaResponseType<UpdateTaskResponse<TaskType>, { type: string; payload?: unknown }> {
    try {
        const result = yield call(updateTaskMutation, action.data);
        if (result.updateTodolistTitle.status === 200) {
            yield put({ type: UPDATE_TODO_SUCCESS });
            yield put({ type: GET_TODO_REQUEST });
            yield put(closeModal());
        } else {
            alert(result.updateTodolistTitle.message);
            throw new Error(result.updateTodolistTitle.message);
        }
    } catch (error) {
        yield put({ type: UPDATE_TODO_FAILURE, payload: error });
    }
}

function* watchGetUserTodo() {
    yield takeLatest(GET_TODO_REQUEST, getTodoList);
}

function* watchCreateTodo() {
    yield takeLatest(CREATE_TODO_REQUEST, createTodo);
}

function* watchCompletedTask() {
    yield takeLatest(COMPLETED_TODO_REQUEST, completedTask);
}

function* watchDeleteTask() {
    yield takeLatest(DELETE_TODO_REQUEST, deleteTask);
}

function* watchUpdateTask() {
    yield takeLatest(UPDATE_TODO_REQUEST, updateTask);
}

export default function* todoSaga() {
    yield all([
        fork(watchCreateTodo),
        fork(watchGetUserTodo),
        fork(watchCompletedTask),
        fork(watchDeleteTask),
        fork(watchUpdateTask),
    ]);
}
