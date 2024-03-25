'use client';

import Button from '@/app/components/button';
import RoubitLogo from '@/public/logo_splash.png';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/input';

type UserAuth = {
    email: string;
    password: string;
};

const Login = () => {
    const { register, handleSubmit } = useForm<UserAuth>();
    const onSubmit: SubmitHandler<UserAuth> = (data: UserAuth) => console.log(data);
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
                        <Button bgcolor="white" color="[#55AB7B]" text="Create new account" />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Login;
