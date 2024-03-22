// 로그인

interface Login {
    email: string | number;
    password: string | number;
}

interface signUp {
    email: string | number;
    fullName: string;
    Username: string;
    password: string | number;
}

interface TodoList {
    id: number;
    title: string;
    completed: boolean;
}
