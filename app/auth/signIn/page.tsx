import { SignInHeader } from '@/app/components/signIn/SignInHeader';
import { SignInForm } from '@/app/components/signIn/SignInForm';
import { GotoSignUp } from '@/app/components/signIn/GotoSignUp';

const Login = () => {
    return (
        <main className="max-w-lg w-full p-8">
            <SignInHeader />
            <SignInForm />
            <GotoSignUp />
        </main>
    );
};
export default Login;
