import useSignInMutataion from '@/\bgraphQLMutation/useSignInMutation';

type UserInfo = {
    email: string;
    password: string;
};

export const useSignInHandler = () => {
    const { mutationSignIn, isPending } = useSignInMutataion();
    const signIn = async (userInfo: UserInfo) => {
        try {
            const response = await mutationSignIn(userInfo);
            return response;
        } catch (error) {
            console.error('Error signing up:', error);
            throw new Error('Failed to sign up');
        }
    };

    return {
        signIn,
        isPending,
    };
};
