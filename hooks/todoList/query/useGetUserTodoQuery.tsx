import { gql } from 'graphql-request';
import { AxiosResponseType, RejectType, TaskType } from '@/app/types/common';
import { getGraphQLClient } from '@/reactQuery/getGraphQLClient';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

const getUserTodoMutationQuery = gql`
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

export interface GetTodoListRejectType {
    todolist: RejectType;
}

type TodoList = {
    todolist: TaskType[];
};

type GetTodoListResponseType = {
    todolist: AxiosResponseType<TodoList>;
};

export type GetTodoListResponse<T extends TaskType> = { todolist: AxiosResponseType<T> };

export const useGetUserTodoQuery = () => {
    const gettodoList = useCallback(async (): Promise<TaskType[] | GetTodoListRejectType> => {
        // 함수를 메모이제이션!!
        const client = getGraphQLClient();

        const response: GetTodoListResponseType | GetTodoListRejectType = await client.request(
            getUserTodoMutationQuery
        );

        const result = response.todolist.data?.todolist ?? [];
        return result;
    }, []);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['userTodoList'],
        queryFn: gettodoList,
        staleTime: 1000 * 60 * 10,
        retry: 3,
    });

    return { getTodoList: data, isLoading, refetch };
};
