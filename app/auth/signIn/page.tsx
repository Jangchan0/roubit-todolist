'use client';

import Button from '@/app/components/button';
import RoubitLogo from '@/public/logo_splash.png';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Input from '@/app/components/input';
import { useRouter } from 'next/navigation';
import { useSignInHandler } from '@/hooks/useLoginHandler';

type UserAuth = {
    email: string;
    password: string;
};

const Login = () => {
    const router = useRouter();

    const { register, handleSubmit } = useForm<UserAuth>();

    const { signIn, isPending } = useSignInHandler();

    const onSubmit = async (data: UserAuth) => {
        try {
            const isVaild = !data.email || !data.password || data.email.length === 0 || data.password.length === 0;
            if (isVaild) {
                alert('아이디 혹은 비밀번호를 입력해주세요');
                return;
            }
            const response = await signIn(data);
            if (response.signIn.data && response.signIn.data.accessToken) {
                localStorage.setItem('todoAccessToken', response.signIn.data.accessToken);
                router.push('/');
            } else {
                alert(response.signIn.message);
            }
        } catch (error) {
            console.error('Error signing in: ', error);
            alert('다시 시도해주세요..!');
        }
    };

    const goSignUp = () => {
        router.push('/auth/signUp');
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <main className="max-w-lg w-full p-8">
                    <div className="flex justify-center mb-8">
                        <Image src={RoubitLogo} alt="Login" width={180} height={90} />
                    </div>
                    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
                        <Input type="text" placeholder="Phone number or Email" register={register('email')} />
                        <Input type="password" placeholder="Password" register={register('password')} />
                        <Button
                            type="submit"
                            bgcolor="roubit-point-color"
                            color="white"
                            text={isPending ? 'Logging In...' : 'Log in'}
                        />
                    </form>
                    <div className="text-center mt-8">
                        <Button bgcolor="white" color="[#55AB7B]" text="Create new account" onClick={goSignUp} />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Login;
