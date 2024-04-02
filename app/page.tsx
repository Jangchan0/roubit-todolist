'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_TODO_REQUEST, GET_TODO_REQUEST } from '@/reducers/todo';
import { RootState } from '@/reducers';
import TodoItem from './components/todoItem';
import Image from 'next/image';
import todoBtn from '@/public/button.png';
import progress from '@/public/progress.png';
import progressBg from '@/public/progressBg.png';
import ModifyTodoModal from './components/modifyTodo';
import { useMutation } from '@tanstack/react-query';
import createTodoMutation from '@/graphQLMutation/createTodoMutation';

type titleInput = {
    title: string;
};

type todoList = {
    id: string;
    title: string;
    completed: boolean;
};

export default function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const todoList = useSelector((state: RootState) => state.todo.getTodoSuccess?.todolist?.data?.todolist);

    const { register, handleSubmit, reset } = useForm<titleInput>();

    useEffect(() => {
        const token = localStorage.getItem('todoAccessToken');
        if (!token) {
            router.push('/auth/signIn');
            return;
        }

        dispatch({ type: GET_TODO_REQUEST });
    }, [dispatch, router]);

    const mutation = useMutation({
        mutationFn: createTodoMutation,
    });

    const onSubmit: SubmitHandler<titleInput> = (data: titleInput) => {
        try {
            data.title.length > 0 ? mutation.mutate(data) : alert('할 일을 작성해주세요!');
            reset();
        } catch (err) {
            alert(err);
            reset();
        }
    };

    const filterTakesComplete = () => {
        if (!todoList) return '';
        const takesDone = todoList.filter((item: { completed: boolean }) => item.completed === true);
        return `${takesDone.length} of ${todoList.length} takes done`;
    };

    const calculateProgressWidth = () => {
        if (!todoList || todoList.length === 0) return '0';
        const completedTasks = todoList.filter((item: { completed: boolean }) => item.completed === true);
        const progressWidth = (completedTasks.length / todoList.length) * 100;
        return String(progressWidth);
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen ">
                <ModifyTodoModal />
                <main>
                    <h2 className="font-black text-3xl mb-8">To-Do List</h2>
                    <form className="flex mb-8" onSubmit={handleSubmit(onSubmit)}>
                        <Input type="text" placeholder="Add your task" register={register('title')} />
                        <button type="submit" className="ml-[12px]">
                            <Image src={todoBtn} alt="일정 추가" width={42} height={42} />
                        </button>
                    </form>
                    <div className="grid grid-cols-1 min-h-80 overflow-scroll">
                        {todoList &&
                            todoList.map((item: todoList) => (
                                <div key={item.id} className="border-b border-gray-20 last:border-none py-5">
                                    <TodoItem todoInfo={item} />
                                </div>
                            ))}
                    </div>
                    <div className="flex flex-col items-center justify-end mt-[100px]">
                        <p className="text-roubit-point-color text-sm">{filterTakesComplete()}</p>
                        <div className="relative w-full h-[20px] mb-10">
                            <Image src={progressBg} alt="progress background" layout="fill" objectFit="contain" />
                            <Image
                                className="absolute top-0 left-0 rounded-lg h-full object-fill transform transition-all"
                                src={progress}
                                alt="progress"
                                style={{ width: `${calculateProgressWidth()}% ` }}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
