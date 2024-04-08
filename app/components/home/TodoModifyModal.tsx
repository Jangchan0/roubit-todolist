'use client';

import { Input } from '../Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../Button';
import { useEffect } from 'react';
import { useUpdateTodoHandler } from '@/hooks/todoList/useUpdateTodoHandler';
import { useModalStore } from '@/store/useModalStore';
import { Loading } from '../Loading';
import { useShallow } from 'zustand/react/shallow';

type updateTaskArgumentsType = {
    id: string;
    title: string;
};

export const TodoModifyModal = () => {
    const { register, handleSubmit, reset } = useForm<updateTaskArgumentsType>();

    const { updateTodo, isPending } = useUpdateTodoHandler();

    const { setModal, setUpdateTaskId, updateTaskId } = useModalStore(
        useShallow((state) => ({
            setModal: state.setModal,
            setUpdateTaskId: state.setUpdateTaskId,
            updateTaskId: state.updateTaskId,
        }))
    );

    useEffect(() => {
        reset({
            title: updateTaskId.title ? updateTaskId.title : '',
        });
    }, [updateTaskId, reset]);

    const onSubmit: SubmitHandler<updateTaskArgumentsType> = (data: updateTaskArgumentsType) => {
        try {
            setUpdateTaskId(updateTaskId.id, (updateTaskId.title = data.title));

            updateTodo();
        } catch (error) {
            console.error('Error login:', error);
            alert('다시 시도해주세요..!');
        }
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 이벤트 버블링 멈추기용!
        e.stopPropagation();
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
                onClick={handleCloseModal}
            >
                {isPending && <Loading />}
                <div
                    className="flex flex-col  bg-white p-8 rounded-md w-80 h-60 items-center"
                    onClick={handleModalClick}
                >
                    <h3 className="text-2xl mb-8">Update To-Do</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col justify-between items-center h-full "
                    >
                        <Input
                            type="text"
                            placeholder="change your Task!"
                            register={register('title')}
                            value={updateTaskId.title}
                        />
                        <Button type="submit" bgcolor="roubit-point-color" color="white" text="update!" />
                    </form>
                </div>
            </div>
        </>
    );
};
