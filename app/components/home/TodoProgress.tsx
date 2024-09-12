import Image from 'next/image';
import progress from '@/public/progress.png';
import progressBg from '@/public/progressBg.png';
import { useGetUserTodoQuery } from '@/hooks/todoList/query/useGetUserTodoQuery';

export const TodoProgress = () => {
    const { getTodoList } = useGetUserTodoQuery();
    const todoList = getTodoList;
    const isVaildTodoList = !Array.isArray(todoList);

    const filterTakesComplete = () => {
        if (isVaildTodoList) return;
        const takesDone = todoList.filter((item: { completed: boolean }) => item.completed === true);
        return `${takesDone.length} of ${todoList.length} takes done`;
    };

    const calculateProgressWidth = () => {
        if (isVaildTodoList || todoList.length === 0) return '0';
        const completedTasks = todoList.filter((item: { completed: boolean }) => item.completed === true);
        const progressWidth = (completedTasks.length / todoList.length) * 100;
        return String(progressWidth);
    };

    return (
        <div className="flex flex-col items-center justify-end mt-[100px]">
            <p className="text-roubit-point-color text-sm h-5">{filterTakesComplete()}</p>
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
    );
};
