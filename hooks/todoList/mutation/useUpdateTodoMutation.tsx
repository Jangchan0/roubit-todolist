import { AxiosResponseType } from '@/app/types/common';
import { getGraphQLClient } from '@/reactQuery/getGraphQLClient';
import { useMutation } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { useCallback } from 'react';

const updateTaskMutationQuery = gql`
    mutation updateTodolistTitle($updateTodolistTitleInput: UpdateTodolistTitleInput!) {
        updateTodolistTitle(updateTodolistTitleInput: $updateTodolistTitleInput) {
            status
            data {
                todolist {
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

type UpdateTodo = {
    todolist: todolist;
};

export type UpdateTaskResponse<T extends UpdateTodo> = { updateTodolistTitle: AxiosResponseType<T> };

export const useUpdateTodoMutation = () => {
    const updateTask = useCallback(
        async (updateTaskArguments: updateTaskArgumentsType): Promise<UpdateTaskResponse<UpdateTodo>> => {
            const client = getGraphQLClient();
            const response: UpdateTaskResponse<UpdateTodo> = await client.request(updateTaskMutationQuery, {
                updateTodolistTitleInput: updateTaskArguments,
            });
            return response;
        },
        []
    );

    const { mutateAsync, isPending } = useMutation({
        mutationFn: updateTask,
    });
    return { mutateUpdateTodo: mutateAsync, isPending };
};
