'use client';

import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { useForm } from 'react-hook-form';
import { useSignUpHandler } from '@/hooks/auth/useSignUpHandler';
import { signUpIdPattern, hasWhitespace, signUpPasswordPattern } from '@/constants';
import { useCallback } from 'react';

export const SignUpForm = () => {
    const { signUp, isPending } = useSignUpHandler();
    const { register, handleSubmit, watch } = useForm<SignUpInput>();
    const watchedValues = watch();

    const signUpOnSubmit = async (data: SignUpInput) => {
        signUp(data);
    };

    const realTimeInspection = useCallback(
        (input: inputsType) => {
            const watchValue = watchedValues[input.field];
            const isCorrectValue = watchValue?.length > 0;
            const isCorrectInputPattern = input?.pattern?.test(watchValue);

            return isCorrectValue && !isCorrectInputPattern;
        },
        [watchedValues]
    );

    const isFormValid = useCallback(() => {
        if (isPending) return false;
        return (
            Object.values(watchedValues).every((value) => value.length > 0) &&
            inputs.every((input) => !realTimeInspection(input))
        );
    }, [watchedValues, isPending, realTimeInspection]);

    return (
        <form className="flex flex-col gap-4 items-start text-sm" onSubmit={handleSubmit(signUpOnSubmit)}>
            {inputs.map((input) => (
                <div key={input.field} className="h-[82px]">
                    <p>{input.title}</p>
                    <Input
                        type={input.field !== 'password' ? 'text' : 'password'}
                        placeholder={input.placeholder}
                        register={register(input.field as SignUpInputKeyType, {
                            required: true,
                        })}
                    />
                    {realTimeInspection(input) && <p className="text-red-500 text-xs">{input.err}</p>}
                </div>
            ))}
            <Button
                type="submit"
                bgcolor={isFormValid() ? 'roubit-point-color' : 'gray-200'}
                color={isFormValid() ? 'white' : 'gray-400'}
                text={isPending ? 'Signing Up...' : 'Sign Up'}
                disabled={!isFormValid()}
            />
        </form>
    );
};

type SignUpInput = {
    email: string;
    password: string;
    fullName: string;
    username: string;
};

type SignUpInputKeyType = keyof SignUpInput;

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
