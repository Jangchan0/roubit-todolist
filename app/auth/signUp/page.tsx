'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/app/components/input';
import Button from '@/app/components/button';

type SignUpInput = {
    email: string;
    password: string;
    fullName: string;
    userName: string;
};

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignUpInput>();
    const onSubmit: SubmitHandler<SignUpInput> = (data: SignUpInput) => console.log(data);

    const isInputValid = (field: keyof SignUpInput, value: string) => {
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
            if (!isInputValid(field as keyof SignUpInput, value)) {
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
                                    register={register(input.field as keyof SignUpInput, {
                                        required: true,
                                        validate: (value) => isInputValid(input.field as keyof SignUpInput, value),
                                    })}
                                />
                                {errors[input.field] && <p className="text-red-500 text-xs">{input.err}</p>}
                            </div>
                        ))}
                        <Button
                            type="submit"
                            bgcolor={isFormValid() ? 'roubit-point-color' : 'gray-200'}
                            color={isFormValid() ? 'white' : 'gray-400'}
                            text="Sign up"
                            disabled={isFormValid()}
                        />
                    </form>
                    <div />
                </main>
            </div>
        </>
    );
};

export default SignUp;

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
    },
    {
        title: 'User Name',
        placeholder: '2-12 character user name',
        err: 'Input your Username Please',
        field: 'userName',
    },
    {
        title: 'Password',
        placeholder: '8-12 character password',
        field: 'password',
        err: 'includes 8 to 12 uppercase letters and special characters.',
        pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,12}$/,
    },
];
