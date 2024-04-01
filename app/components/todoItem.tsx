import completedChecker from '@/public/trash-2.png';
import checkbox from '@/public/Checkbox.png';
import checkedBox from '@/public/Checkbox2.png';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { COMPLETED_TODO_REQUEST, DELETE_TODO_REQUEST } from '@/reducers/todo';

type todoList = {
    id: string;
    title: string;
    completed: boolean;
};

type completedTaskArgumentsType = Omit<todoList, 'title'>;
type deletedTaskArgumentsType = Pick<todoList, 'id'>;
type updateTaskArgumentsType = Omit<todoList, 'completed'>;

const TodoItem = ({ todoInfo }: { todoInfo: todoList }) => {
    const completedTaskArguments: completedTaskArgumentsType = {
        id: todoInfo.id,
        completed: !todoInfo.completed,
    };
    const deletedTaskArguments: deletedTaskArgumentsType = {
        id: todoInfo.id,
    };
    const updateTaskArguments: updateTaskArgumentsType = {
        id: todoInfo.id,
        title: todoInfo.title,
    };

    const dispatch = useDispatch();
    const item = todoInfo;

    const completedTask: React.MouseEventHandler<HTMLImageElement> = () => {
        dispatch({ type: COMPLETED_TODO_REQUEST, data: completedTaskArguments });
    };
    const deletedTask: React.MouseEventHandler<HTMLImageElement> = () => {
        dispatch({ type: DELETE_TODO_REQUEST, data: deletedTaskArguments });
    };

    const openModal = () => {
        dispatch({ type: 'OPEN_MODAL', payload: updateTaskArguments });
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-x-[10px]">
                <Image
                    src={item.completed ? checkedBox : checkbox}
                    alt="체크박스"
                    width={24}
                    height={24}
                    onClick={completedTask}
                    className="cursor-pointer"
                />
                <p
                    className={
                        item.completed
                            ? 'text-[#929294] line-through overflow-y-scroll max-w-[259px] cursor-pointer'
                            : 'overflow-y-scroll max-w-[259px] cursor-pointer'
                    }
                    onClick={openModal}
                >
                    {item.title}
                </p>
            </div>
            <Image
                src={completedChecker}
                alt="V"
                width={24}
                height={24}
                onClick={deletedTask}
                className="cursor-pointer"
            />
        </div>
    );
};

export default TodoItem;
