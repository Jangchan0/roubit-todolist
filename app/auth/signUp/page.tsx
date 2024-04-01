'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/components/input';
import Button from '@/app/components/button';
import { SIGNUP_REQUEST } from '@/reducers/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { signUpIdPattern, hasWhitespace, signUpPasswordPattern } from '@/constants';

type SignUpInput = {
    email: string;
    password: string;
    fullName: string;
    username: string;
};
type SignUpInputKeyType = keyof SignUpInput;

const SignUp = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { register, handleSubmit, watch } = useForm<SignUpInput>();
    const watchedValues = watch();

    const onSubmit = (data: SignUpInput): void => {
        try {
            dispatch({ type: SIGNUP_REQUEST, data, router });
        } catch (error) {
            console.error('Error signing up:', error);
            alert('다시 시도해주세요..!');
        }
    };

    const checkInputValidity = (input: inputsType) => {
        const watchValue = watchedValues[input.field];
        const isValid = watchValue && watchValue.length > 0 && !checkInputPatternCompliance(input.field, watchValue);
        return isValid;
    };

    const checkInputPatternCompliance = (field: SignUpInputKeyType, value: string) => {
        const input = inputs.find((input) => input.field === field);
        if (input && input.pattern) {
            return input.pattern.test(value);
        }
        return true;
    };

    const isFormValid = (): boolean => {
        for (const _field of Object.keys(watchedValues)) {
            const field = _field as keyof SignUpInput;
            const value = watchedValues[field];
            if (value === '') return false;
            if (!checkInputPatternCompliance(field, value)) {
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
                                    register={register(input.field as SignUpInputKeyType, {
                                        required: true,
                                        validate: (value) =>
                                            checkInputPatternCompliance(input.field as SignUpInputKeyType, value),
                                    })}
                                />
                                {checkInputValidity(input) && <p className="text-red-500 text-xs">{input.err}</p>}
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

type inputsType = {
    field: SignUpInputKeyType;
    title: string;
    placeholder: string;
    pattern?: RegExp;
    err: string;
};

const inputs: inputsType[] = [
    {
        title: 'Phone number or Email',
        placeholder: 'Please enter your phone number or Email',
        field: 'email',
        err: 'Please enter your phone number or Email',
        pattern: signUpIdPattern,
    },
    {
        title: 'Full Name',
        placeholder: 'Please enter your Full name',
        err: 'Input your Fullname, please',
        field: 'fullName',
        pattern: hasWhitespace,
    },
    {
        title: 'User Name',
        placeholder: '2-12 character user name',
        err: 'Input your Username Please',
        field: 'username',
        pattern: hasWhitespace,
    },
    {
        title: 'Password',
        placeholder: '8-12 character password',
        field: 'password',
        err: 'includes 8 to 12 uppercase letters and special characters.',
        pattern: signUpPasswordPattern,
    },
];
