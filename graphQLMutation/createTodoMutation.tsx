import { AxiosResponseType, TaskType } from '@/app/types/common';
import fetchData from '../sagas/Axios/fetch';

const createTodoMutationQuery = `
mutation createTodoList($createTodoListInput: CreateTodoListInput!) {
  createTodoList(createTodoListInput: $createTodoListInput) {
    status
    data {
      todolist {
        title
      }
    }
    message
  }
}
`;

type CreateTodoListInput = {
    title: string;
};

export type CreateTaskResponse<T extends TaskType> = { createTodoList: AxiosResponseType<T> };

const createTodoMutation = async (createTodoTitle: CreateTodoListInput): Promise<CreateTaskResponse<TaskType>> => {
    try {
        const { data } = await fetchData(createTodoMutationQuery, { createTodoListInput: createTodoTitle });
        return data;
    } catch (error) {
        console.error('Error creating todo list:', error);
        throw new Error('Failed to create todo list');
    }
};

export default createTodoMutation;
