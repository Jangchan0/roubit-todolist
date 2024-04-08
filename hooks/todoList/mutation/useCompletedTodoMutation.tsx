import { useMutation } from '@tanstack/react-query';
import { AxiosResponseType, TaskType } from '@/app/types/common';
import { getGraphQLClient } from '@/reactQuery/getGraphQLClient';
import { gql } from 'graphql-request';
import { useCallback } from 'react';

const completedTaskMutationQuery = gql`
    mutation updateTodolistCompleted($updateTodolistCompletedInput: UpdateTodolistCompletedInput!) {
        updateTodolistCompleted(updateTodolistCompletedInput: $updateTodolistCompletedInput) {
            status
            data {
                todolist {
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

type CompleteTodoType = {
    todolist: TaskType;
};

export type CompletedTaskResponse<T extends CompleteTodoType> = { updateTodolistCompleted: AxiosResponseType<T> };

export const useCompletedTodoMutation = () => {
    const completedTask = useCallback(
        async (
            completedTaskArguments: CompletedTaskArgumentsType
        ): Promise<CompletedTaskResponse<CompleteTodoType>> => {
            const client = getGraphQLClient();
            const response: CompletedTaskResponse<CompleteTodoType> = await client.request(completedTaskMutationQuery, {
                updateTodolistCompletedInput: completedTaskArguments,
            });
            return response;
        },
        []
    );

    const { mutateAsync, isPending } = useMutation({
        mutationFn: completedTask,
    });

    return { mutateComplete: mutateAsync, isPending };
};
