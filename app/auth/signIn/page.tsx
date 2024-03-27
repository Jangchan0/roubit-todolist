'use client';

import Button from '@/app/components/button';
import RoubitLogo from '@/public/logo_splash.png';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/input';
import { LOGIN_REQUEST } from '@/reducers/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

type UserAuth = {
    email: string;
    password: string;
};

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { register, handleSubmit } = useForm<UserAuth>();
    const onSubmit: SubmitHandler<UserAuth> = (data: UserAuth) => {
        try {
            dispatch({ type: LOGIN_REQUEST, data, router });
        } catch (error) {
            console.error('Error login:', error);
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
                        <Button type="submit" bgcolor="roubit-point-color" color="white" text="Log in" />
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
