'use client';

import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TODO_REQUEST, closeModal } from '@/reducers/todo';
import { RootState } from '@/reducers';
import Input from './input';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './button';
import { useEffect } from 'react';

type updateTaskArgumentsType = {
    id: string;
    title: string;
};

const ModifyTaskModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.todo.openModal);
    const updateTaskInit: updateTaskArgumentsType = useSelector((state: RootState) => state.todo.openModalSuccess);

    const { register, handleSubmit, reset } = useForm<updateTaskArgumentsType>();

    useEffect(() => {
        reset({
            title: updateTaskInit ? updateTaskInit.title : '',
        });
    }, [updateTaskInit, reset]);

    const onSubmit: SubmitHandler<updateTaskArgumentsType> = (data: updateTaskArgumentsType) => {
        try {
            dispatch({ type: UPDATE_TODO_REQUEST, data: { id: updateTaskInit.id, title: data.title } });
        } catch (error) {
            console.error('Error login:', error);
            alert('다시 시도해주세요..!');
        }
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 이벤트 버블링 멈추기용!
        e.stopPropagation();
    };

    const checkIsOpenModal: boolean = isOpen && updateTaskInit && updateTaskInit.title.length > 0;

    return (
        <>
            {checkIsOpenModal && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
                    onClick={handleCloseModal}
                >
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
                                value={updateTaskInit.title}
                            />
                            <Button type="submit" bgcolor="roubit-point-color" color="white" text="update!" />
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModifyTaskModal;
