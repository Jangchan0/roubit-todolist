import { useSignInMutation } from '@/hooks/auth/mutation/useSignInMutation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type UserInfo = {
    email: string;
    password: string;
};

export const useSignInHandler = () => {
    const router = useRouter();
    const { mutationSignIn, isPending } = useSignInMutation();

    const signIn = useCallback(
        async (userInfo: UserInfo) => {
            try {
                const inValid =
                    !userInfo.email ||
                    !userInfo.password ||
                    userInfo.email.length === 0 ||
                    userInfo.password.length === 0;
                if (inValid) {
                    alert('아이디 혹은 비밀번호를 입력해주세요');
                    return;
                }
                const response = await mutationSignIn(userInfo);
                const isSuccessSignIn = response.signIn.data?.accessToken;
                if (isSuccessSignIn) {
                    localStorage.setItem('todoAccessToken', isSuccessSignIn);
                    router.push('/');
                } else {
                    alert(response.signIn.message);
                }
                return response;
            } catch (error) {
                alert('로그인 실패.. 다시 시도해주세요');
                throw new Error('로그인 실패' + error);
            }
        },
        [mutationSignIn, router]
    );

    return {
        signIn,
        isPending,
    };
};
