import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '@/hooks/auth/mutation/useSignUpMutation';
import { useCallback } from 'react';

type UserInfo = {
    email: string;
    password: string;
    fullName: string;
    username: string;
};

export const useSignUpHandler = () => {
    const router = useRouter();
    const { mutationSignUp, isPending } = useSignUpMutation();
    const signUp = useCallback(
        async (userInfo: UserInfo) => {
            try {
                const response = await mutationSignUp(userInfo);
                const isValid = response.signUp.data && response.signUp.data.email === userInfo.email;
                if (isValid) {
                    alert('환영합니다! 함께 더욱 부지런해져봐요!');
                    router.push('/auth/signIn');
                } else {
                    alert(response.signUp.message);
                }
            } catch (error) {
                console.error('Error signing up:', error);
                throw new Error('Failed to sign up');
            }
        },
        [mutationSignUp, router]
    );

    return {
        signUp,
        isPending,
    };
};
