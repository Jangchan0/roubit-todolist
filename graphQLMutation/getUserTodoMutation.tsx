import fetchData from '../sagas/Axios/fetch';
import { AxiosResponseType, TaskType, Todolist } from '@/app/types/common';

const getUserTodoMutation = `
  query GetTodoList {
    todolist {
      status
      data {
        todolist {
          id
          title
          completed
        }
      }
      message
    }
  }
`;

export type GetTodoListResponse<T extends TaskType> = { todolist: AxiosResponseType<T> };

const getTodoListMutation = async (): Promise<GetTodoListResponse<TaskType>> => {
    try {
        const { data } = await fetchData(getUserTodoMutation, {});
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};

export default getTodoListMutation;
