import { useQueryClient } from '@tanstack/react-query';
import { useDeletedTodoListMutation } from './mutation/useDeletedTodoListMutation';
import { TaskType } from '@/app/types/common';
import cloneDeep from 'lodash/cloneDeep';
import { useCallback } from 'react';

type DeleteTodoListType = {
    id: string;
};

export const useDeleteTodoHandler = () => {
    const queryClient = useQueryClient();
    const { mutateDeletedTodo, isPending } = useDeletedTodoListMutation();
    const deletedTodo = useCallback(
        async (deletedTodoId: DeleteTodoListType) => {
            try {
                const response = await mutateDeletedTodo(deletedTodoId);
                const newTodo = response.deletedTodolist.data.todolist;
                queryClient.setQueryData(['userTodoList'], (data: TaskType[]) =>
                    cloneDeep(data).filter((todo) => todo.id !== newTodo.id)
                ); // 상태변경을 감지할 수 있게 하기위해 깊은 복사 사용!
            } catch (error) {
                throw new Error('할 일 삭제 실패...');
            }
        },
        [queryClient, mutateDeletedTodo]
    );

    return { deletedTodo, isPending };
};
