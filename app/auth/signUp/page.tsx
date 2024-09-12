import { SignUpHeader } from '@/app/components/signUp/SignUpHeader';
import { SignUpForm } from '@/app/components/signUp/SignUpForm';

const SignUp = () => {
    return (
        <main className="max-w-lg w-full p-8">
            <SignUpHeader />
            <SignUpForm />
        </main>
    );
};

export default SignUp;
