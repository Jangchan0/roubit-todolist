import completedChecker from '@/public/trash-2.png';
import checkbox from '@/public/Checkbox.png';
import checkedBox from '@/public/Checkbox2.png';
import Image from 'next/image';
import { useDeleteTodoHandler } from '@/hooks/todoList/useDeleteTodoHandler';
import { useCompletedTodoHandler } from '@/hooks/todoList/useCompletedTodoHandler';
import { useModalStore } from '@/store/useModalStore';
import { useShallow } from 'zustand/react/shallow';

type todoList = {
    id: string;
    title: string;
    completed: boolean;
};

type completedTaskArgumentsType = Omit<todoList, 'title'>;
type deletedTaskArgumentsType = Pick<todoList, 'id'>;

export const TodoItem = ({ todoInfo }: { todoInfo: todoList }) => {
    const completedTaskArguments: completedTaskArgumentsType = {
        id: todoInfo.id,
        completed: !todoInfo.completed,
    };
    const deletedTaskArguments: deletedTaskArgumentsType = {
        id: todoInfo.id,
    };

    const { deletedTodo } = useDeleteTodoHandler();
    const { completeTodo } = useCompletedTodoHandler();
    const { setUpdateTaskId, setModal, updateTaskId } = useModalStore(
        useShallow((state) => ({
            setModal: state.setModal,
            setUpdateTaskId: state.setUpdateTaskId,
            updateTaskId: state.updateTaskId,
        }))
    );

    const item = todoInfo;

    const completedTask: React.MouseEventHandler<HTMLImageElement> = () => {
        completeTodo(completedTaskArguments);
    };
    const deletedTask: React.MouseEventHandler<HTMLImageElement> = () => {
        deletedTodo(deletedTaskArguments);
    };
    const openModal = () => {
        setModal(true);
        setUpdateTaskId((updateTaskId.id = todoInfo.id), (updateTaskId.title = todoInfo.title));
    };

    return (
        <div className="flex justify-between items-center border-b border-gray-20 last:border-none h-16">
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
