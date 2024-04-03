import { AxiosResponseType, TaskType } from '@/app/types/common';
import request, { gql } from 'graphql-request';

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

export type CreateTaskResponse<T extends TaskType> = { createTodoList: AxiosResponseType<T> };

const createTodoMutation = async (createTodoTitle: CreateTodoListInput): Promise<CreateTaskResponse<TaskType>> => {
    try {
        const variables = {
            createTodoListInput: createTodoTitle,
        };
        const response = await request<CreateTaskResponse<TaskType>>(
            'http://localhost:8080/graphql',
            createTodoMutationQuery,
            variables
        );
        return response;
    } catch (error) {
        throw new Error('Failed to create todo list');
    }
};

export default createTodoMutation;
