'use client';
import { Input } from '@/app/components/Input';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import { useSignInHandler } from '@/hooks/auth/useSignInHandler';
import { useCallback } from 'react';

type UserAuth = {
    email: string;
    password: string;
};

export const SignInForm = () => {
    const { signIn, isPending } = useSignInHandler();
    const { register, handleSubmit } = useForm<UserAuth>();
    const signInOnSubmit = useCallback(async (data: UserAuth) => signIn(data), [signIn]);
    return (
        <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit(signInOnSubmit)}>
            <Input type="text" placeholder="Phone number or Email" register={register('email')} />
            <Input type="password" placeholder="Password" register={register('password')} />
            <Button
                type="submit"
                bgcolor="roubit-point-color"
                color="white"
                text={isPending ? 'Logging In...' : 'Log in'}
            />
        </form>
    );
};
