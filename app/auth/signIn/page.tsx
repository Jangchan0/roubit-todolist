'use client';

import Button from '@/app/components/button';
import RoubitLogo from '@/public/logo_splash.png';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/input';

type UserAuth = {
    email: string | number;
    password: string | number;
};

const Login = () => {
    const { register, handleSubmit } = useForm<UserAuth>();
    const onSubmit: SubmitHandler<UserAuth> = (data: UserAuth) => console.log(data);
    return (
        <>
            <div className="w-[100wh] h-[100vh]">
                <div className="w-full h-full  flex justify-center items-center">
                    <div className="">
                        <Image className="mx-auto mb-8" src={RoubitLogo} alt="Login" width={180} height={90} />
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <Input type="text" placeholder="Phone number or Email" register={register('email')} />
                            <Input type="password" placeholder="Password" register={register('password')} />
                            <Button type="submit" bgcolor="roubit-point-color" color="white" text="Log in" />
                        </form>
                        <div className="text-center mt-24">
                            <Button bgcolor="white" color="[#55AB7B]" text="Create new account" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
