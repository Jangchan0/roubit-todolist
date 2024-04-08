import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoProgress } from './TodoProgress';
import { TodoHeader } from './TodoHeader';

export const Index = () => {
    return (
        <main>
            <TodoHeader />
            <TodoForm />
            <TodoList />
            <TodoProgress />
        </main>
    );
};
