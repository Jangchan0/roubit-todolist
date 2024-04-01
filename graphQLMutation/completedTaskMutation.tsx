import fetchData from '../sagas/Axios/fetch';
import { AxiosResponseType, TaskType } from '@/app/types/common';

const completedTaskMutationQuery = `
mutation updateTodolistCompleted(
    $updateTodolistCompletedInput: UpdateTodolistCompletedInput!) {
        updateTodolistCompleted(
            updateTodolistCompletedInput: $updateTodolistCompletedInput
        ) {
            status
            data {
                todolist{
                    id
                    completed
                }
                }
                message
            }
        }
`;

type CompletedTaskArgumentsType = {
    id: string;
    completed: boolean;
};

export type CompletedTaskResponse<T extends TaskType> = { updateTodolistCompleted: AxiosResponseType<T> };

const completedTaskMutation = async (
    completedTask: CompletedTaskArgumentsType
): Promise<CompletedTaskResponse<TaskType>> => {
    try {
        const { data } = await fetchData(completedTaskMutationQuery, { updateTodolistCompletedInput: completedTask });
        return data;
    } catch (error) {
        console.error('Error completedTask:', error);
        throw new Error('Failed tocompletedTask');
    }
};

export default completedTaskMutation;
