import { useMutation } from '@tanstack/react-query';
import { AxiosResponseType, TaskType } from '@/app/types/common';
import { gql } from 'graphql-request';
import { getGraphQLClient } from '@/reactQuery/getGraphQLClient';
import { useCallback } from 'react';

const deletedTaskMutationQuery = gql`
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

type DeleteTodoType = {
    todolist: TaskType;
};

export type DeleteTaskResponse<T extends DeleteTodoType> = { deletedTodolist: AxiosResponseType<T> };

export const useDeletedTodoListMutation = () => {
    const deletedTodoList = useCallback(
        async (deleteTodoList: DeleteTodoListType): Promise<DeleteTaskResponse<DeleteTodoType>> => {
            const client = getGraphQLClient();
            const response: DeleteTaskResponse<DeleteTodoType> = await client.request(deletedTaskMutationQuery, {
                deleteTodolist: deleteTodoList,
            });
            return response;
        },
        []
    );

    const { mutateAsync, isPending } = useMutation({
        mutationFn: deletedTodoList,
    });
    return { mutateDeletedTodo: mutateAsync, isPending };
};
