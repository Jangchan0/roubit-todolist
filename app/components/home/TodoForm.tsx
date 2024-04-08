import Image from 'next/image';
import { Input } from '../Input';
import todoBtn from '@/public/button.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateTodoHandler } from '@/hooks/todoList/useCreateTodoHandler';

type titleInput = {
    title: string;
};

export const TodoForm = () => {
    const { createTodo } = useCreateTodoHandler();
    const { register, handleSubmit, reset } = useForm<titleInput>();

    const onSubmit: SubmitHandler<titleInput> = (data: titleInput) => {
        createTodo(data);
        reset();
    };
    return (
        <form className="flex mb-8" onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" placeholder="Add your task" register={register('title')} />
            <button type="submit" className="ml-[12px]">
                <Image src={todoBtn} alt="일정 추가" width={42} height={42} />
            </button>
        </form>
    );
};
