import useSignUpMutation from '@/\bgraphQLMutation/useSignUpMutation';

type UserInfo = {
    email: string;
    password: string;
    fullName: string;
    username: string;
};

export const useSignUpHandler = () => {
    const { mutationSignUp, isPending } = useSignUpMutation();
    const signUp = async (userInfo: UserInfo) => {
        try {
            const response = await mutationSignUp(userInfo);
            return response;
        } catch (error) {
            console.error('Error signing up:', error);
            throw new Error('Failed to sign up');
        }
    };

    return {
        signUp,
        isPending,
    };
};
