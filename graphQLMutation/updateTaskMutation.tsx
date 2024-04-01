import { AxiosResponseType, TaskType } from '@/app/types/common';
import fetchData from '../sagas/Axios/fetch';

const updateTaskMutationQuery = `
mutation updateTodolistTitle(
    $updateTodolistTitleInput: UpdateTodolistTitleInput!) {
        updateTodolistTitle(
            updateTodolistTitleInput: $updateTodolistTitleInput
        ) {
            status
            data {
                todolist{
                    id
                    title
                }
                }
                message
            }
        }
`;

interface updateTaskArgumentsType {
    id: string;
    title: string;
}

type todolist = {
    id: string;
    title: string;
    completed: boolean;
};

export type ReturnUpdateResponseType = {
    updateTodolistTitle: {
        status: number;
        data: todolist;
        message: string;
    };
};

export type UpdateTaskResponse<T extends TaskType> = { updateTodolistTitle: AxiosResponseType<T> };

const updateTaskMutation = async (updateTask: updateTaskArgumentsType): Promise<UpdateTaskResponse<TaskType>> => {
    try {
        const { data } = await fetchData(updateTaskMutationQuery, { updateTodolistTitleInput: updateTask });
        return data;
    } catch (error) {
        console.error('Error updateTask:', error);
        throw new Error('Failed to updateTask');
    }
};

export default updateTaskMutation;
