import { TodoItem } from './TodoItem';
import { Loading } from '../Loading';
import { TaskType } from '@/app/types/common';
import { useCreateTodoHandler } from '@/hooks/todoList/useCreateTodoHandler';
import { useGetUserTodoQuery } from '@/hooks/todoList/query/useGetUserTodoQuery';

export const TodoList = () => {
    const { isLoading, getTodoList } = useGetUserTodoQuery();
    const { isPending } = useCreateTodoHandler();

    const todoList = getTodoList;

    const isVaildTodoList = !Array.isArray(todoList);

    return (
        <div className="max-h-72 grid grid-cols-1 overflow-scroll ">
            {(isLoading || isPending) && <Loading />}
            {isVaildTodoList ? (
                <p>할 일 목록을 불러올 수 없습니다.</p>
            ) : (
                todoList.map((item: TaskType) => <TodoItem key={item.id} todoInfo={item} />)
            )}
        </div>
    );
};
