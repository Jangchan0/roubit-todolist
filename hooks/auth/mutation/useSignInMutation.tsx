import { AxiosResponseType, RejectType } from '@/app/types/common';
import { gql } from 'graphql-request';
import { getGraphQLClient } from '@/reactQuery/getGraphQLClient';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

interface login {
    email: string;
    password: string;
}

export type ReturnAccessTokenType = {
    accessToken: string;
};

export type SignInResponseType = {
    signIn: {
        status: number;
        data: ReturnAccessTokenType;
        message: string;
    };
};

type SignInRejectType = {
    signIn: RejectType;
};

export type SignInResponse<T extends ReturnAccessTokenType> = { signIn: AxiosResponseType<T> };

export const useSignInMutation = () => {
    const signIn = useCallback(async (userInput: login): Promise<SignInResponseType | SignInRejectType> => {
        const loginMutationQuery = gql`
            mutation signIn($loginInput: LoginInput!) {
                signIn(loginInput: $loginInput) {
                    status
                    data {
                        accessToken
                    }
                    message
                }
            }
        `;

        const client = getGraphQLClient();
        const response: SignInResponse<ReturnAccessTokenType> | SignInRejectType = await client.request(
            loginMutationQuery,
            {
                loginInput: userInput,
            }
        );
        return response;
    }, []);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: signIn,
    });

    return {
        mutationSignIn: mutateAsync,
        isPending,
    };
};
