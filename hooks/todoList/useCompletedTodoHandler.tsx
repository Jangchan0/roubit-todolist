import { useQueryClient } from '@tanstack/react-query';
import { useCompletedTodoMutation } from './mutation/useCompletedTodoMutation';
import { TaskType } from '@/app/types/common';
import { useCallback } from 'react';

type CompleteTodoArgumentsType = {
    id: string;
    completed: boolean;
};

export const useCompletedTodoHandler = () => {
    const queryClient = useQueryClient();
    const { mutateComplete, isPending } = useCompletedTodoMutation();
    const completeTodo = useCallback(
        async (completedTaskArguments: CompleteTodoArgumentsType) => {
            try {
                const response = await mutateComplete(completedTaskArguments);
                const newTodo = response.updateTodolistCompleted.data.todolist;

                queryClient.setQueryData(['userTodoList'], (data: TaskType[]) =>
                    data.map((todo) => (todo.id === newTodo.id ? { ...todo, completed: newTodo.completed } : todo))
                );
            } catch (error) {
                throw new Error('진행상태 변경 실패..');
            }
        },
        [mutateComplete, queryClient]
    );

    return { completeTodo, completePending: isPending };
};
