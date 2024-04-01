import fetchData from '../sagas/Axios/fetch';
import { AxiosResponseType, TaskType } from '@/app/types/common';

const deletedTaskMutationQuery = `
mutation deletedTodolist($deleteTodolist: DeleteTodolist!) {
    deletedTodolist(deleteTodolist: $deleteTodolist) {
    status
    data {
      todolist {
        id
      }
    }
    message
  }
}
`;

type DeleteTodoListType = {
    id: string;
};

export type DeleteTaskResponse<T extends TaskType> = { deletedTodolist: AxiosResponseType<T> };

const deleteTodoMutation = async (deleteTodolist: DeleteTodoListType): Promise<DeleteTaskResponse<TaskType>> => {
    try {
        const { data } = await fetchData(deletedTaskMutationQuery, { deleteTodolist: deleteTodolist });
        return data;
    } catch (error) {
        console.error('Error delete todo list:', error);
        throw new Error('Failed to delete todo list');
    }
};

export default deleteTodoMutation;
