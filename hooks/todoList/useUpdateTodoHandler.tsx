import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTodoMutation } from './mutation/useUpdateTodoMutation';
import { TaskType } from '@/app/types/common';
import { useModalStore } from '@/store/useModalStore';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const useUpdateTodoHandler = () => {
    const { updateTaskId, setModal } = useModalStore(
        useShallow((state) => ({
            setModal: state.setModal,
            setUpdateTaskId: state.setUpdateTaskId,
            updateTaskId: state.updateTaskId,
        }))
    );
    const queryClient = useQueryClient();
    const { mutateUpdateTodo, isPending } = useUpdateTodoMutation();
    const setTitle = (newTodo: TaskType) => (data: TaskType[]) =>
        data.map((todo) => (todo.id === newTodo.id ? { ...todo, title: newTodo.title } : todo));

    const updateTodo = useCallback(async () => {
        const response = setTitle((await mutateUpdateTodo(updateTaskId)).updateTodolistTitle.data.todolist);
        try {
            queryClient.setQueryData(['userTodoList'], (data: TaskType[]) => {
                const result = response(data);
                return result;
            });
            setModal(false);
        } catch (error) {
            alert('다시 시도해주세요..!');
        }
    }, [mutateUpdateTodo, queryClient, setModal, updateTaskId]);

    return { updateTodo, isPending };
};
