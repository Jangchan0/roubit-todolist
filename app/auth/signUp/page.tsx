'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import { SIGNUP_REQUEST } from '@/reducers/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

type SignUpInput = {
    email: string;
    password: string;
    fullName: string;
    username: string;
    [key: string]: string;
};

const SignUp = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { register, handleSubmit, watch } = useForm<SignUpInput>();
    const onSubmit: SubmitHandler<SignUpInput> = async (data: SignUpInput) => {
        try {
            dispatch({ type: SIGNUP_REQUEST, data, router });
        } catch (error) {
            console.error('Error signing up:', error);
            alert('다시 시도해주세요..!');
        }
    };

    const initInput = (input: inputs) => {
        const watchValue = watchedValues[input.field];
        if (watchValue && watchValue.length > 0 && !isInputValid(input.field, watchValue)) {
            return true;
        } else {
            return false;
        }
    };

    const isInputValid = (field: string, value: string) => {
        const input = inputs.find((input) => input.field === field);
        if (input && input.pattern) {
            return input.pattern.test(value);
        }
        return true;
    };

    const watchedValues = watch();

    const isFormValid = (): boolean => {
        for (const field of Object.keys(watchedValues)) {
            const value = watchedValues[field];
            if (value === '') return false;
            if (!isInputValid(field as string, value)) {
                return false;
            }
        }
        return true;
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <main className="max-w-lg w-full p-8">
                    <h2 className="font-black text-3xl mb-[32px]">
                        Start your
                        <br />
                        Phone number or Email
                    </h2>
                    <form className="flex flex-col gap-4 items-start text-sm" onSubmit={handleSubmit(onSubmit)}>
                        {inputs.map((input) => (
                            <div key={input.field} className="h-[82px]">
                                <p>{input.title}</p>
                                <Input
                                    type={input.field !== 'password' ? 'text' : 'password'}
                                    placeholder={input.placeholder}
                                    register={register(input.field as string, {
                                        required: true,
                                        validate: (value) => isInputValid(input.field as string, value),
                                    })}
                                />
                                {initInput(input) && <p className="text-red-500 text-xs">{input.err}</p>}
                            </div>
                        ))}
                        <Button
                            type="submit"
                            bgcolor={isFormValid() ? 'roubit-point-color' : 'gray-200'}
                            color={isFormValid() ? 'white' : 'gray-400'}
                            text="Sign up"
                            disabled={!isFormValid()}
                        />
                    </form>
                    <div />
                </main>
            </div>
        </>
    );
};

export default SignUp;

type inputs = {
    field: string;
    title: string;
    placeholder: string;
    pattern?: RegExp;
    err: string;
};

const inputs = [
    {
        title: 'Phone number or Email',
        placeholder: 'Please enter your phone number or Email',
        field: 'email',
        err: 'Please enter your phone number or Email',
        pattern: /^(?:\d{3}-?\d{3,4}-?\d{4}|\w+@\w+\.\w{2,3})$/,
    },
    {
        title: 'Full Name',
        placeholder: 'Please enter your Full name',
        err: 'Input your Fullname, please',
        field: 'fullName',
        pattern: /^\S+$/,
    },
    {
        title: 'User Name',
        placeholder: '2-12 character user name',
        err: 'Input your Username Please',
        field: 'username',
        pattern: /^\S+$/,
    },
    {
        title: 'Password',
        placeholder: '8-12 character password',
        field: 'password',
        err: 'includes 8 to 12 uppercase letters and special characters.',
        pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,12}$/,
    },
];
