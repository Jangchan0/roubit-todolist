import { useQueryClient } from '@tanstack/react-query';
import useCreateTodoListMutation from './mutation/useCreateTodoListMutation';
import { TaskType } from '@/app/types/common';
import { useCallback } from 'react';

type CreateTodoListInput = {
    title: string;
};
export const useCreateTodoHandler = () => {
    const queryClient = useQueryClient();
    const { mutateCreateTodo, isPending } = useCreateTodoListMutation();
    const createTodo = useCallback(
        async (title: CreateTodoListInput) => {
            try {
                if (title.title.length === 0) {
                    alert('할 일을 입력해주세요!');
                    return;
                }
                const response = await mutateCreateTodo(title);
                const newTodo = response.createTodoList.data.todolist;
                queryClient.setQueryData(['userTodoList'], (data: TaskType[]) => [...data, newTodo]);
            } catch (error) {
                throw new Error('할 일 생성 실패..');
            }
        },
        [queryClient, mutateCreateTodo]
    );

    return { createTodo, isPending };
};
