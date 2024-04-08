import { AxiosResponseType, TaskType } from '@/app/types/common';
import { getGraphQLClient } from '@/reactQuery/getGraphQLClient';
import { useMutation } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { useCallback } from 'react';

const createTodoMutationQuery = gql`
    mutation createTodoList($createTodoListInput: CreateTodoListInput!) {
        createTodoList(createTodoListInput: $createTodoListInput) {
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

type CreateTodoListInput = {
    title: string;
};
type CreateTodoType = {
    todolist: TaskType;
};

export type CreateTaskResponse<T extends CreateTodoType> = { createTodoList: AxiosResponseType<T> };

const useCreateTodoListMutation = () => {
    const createTodoList = useCallback(
        async (createTodoListInput: CreateTodoListInput): Promise<CreateTaskResponse<CreateTodoType>> => {
            const client = getGraphQLClient();
            const response: CreateTaskResponse<CreateTodoType> = await client.request(createTodoMutationQuery, {
                createTodoListInput: createTodoListInput,
            });
            return response;
        },
        []
    );

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createTodoList,
    });

    return { mutateCreateTodo: mutateAsync, isPending };
};

export default useCreateTodoListMutation;
