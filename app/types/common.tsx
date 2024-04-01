import { Action } from 'redux-saga';
import { CallEffect, PutEffect } from 'redux-saga/effects';

export type AxiosResponseType<T extends object> = {
    status: number;
    data: T;
    message: string;
};

export type Todolist<T extends TaskType> = {
    todolist: T;
};

export type TaskType = {
    id: string;
    title: string;
    completed: boolean;
};

export type SagaResponseType<T, Y extends Action> = Generator<CallEffect<T | boolean> | PutEffect<Y>, void, T>;
