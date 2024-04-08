import { AxiosResponseType, RejectType } from '@/app/types/common';
import { gql } from 'graphql-request';
import { useMutation } from '@tanstack/react-query';
import { getGraphQLClient } from '@/reactQuery/getGraphQLClient';
import { useCallback } from 'react';

export type ReturnSignUpResponseType = {
    id: string;
    email: string;
    fullName: string;
    username: string;
    password: string;
};

interface SignUpRejectType {
    signUp: RejectType;
}
type signUpArgumentsType = Omit<ReturnSignUpResponseType, 'id'>;

export type SignUpResponse<T extends ReturnSignUpResponseType> = { signUp: AxiosResponseType<T> };

export const useSignUpMutation = () => {
    const signUp = useCallback(
        async (data: signUpArgumentsType): Promise<SignUpResponse<ReturnSignUpResponseType> | SignUpRejectType> => {
            const signUpMutationQuery = gql`
                mutation signUp($createUserInput: CreateUserInput!) {
                    signUp(createUserInput: $createUserInput) {
                        status
                        data {
                            email
                            fullName
                            username
                            password
                        }
                        message
                    }
                }
            `;

            const client = getGraphQLClient();
            const response: SignUpResponse<ReturnSignUpResponseType> | SignUpRejectType = await client.request(
                signUpMutationQuery,
                {
                    createUserInput: data,
                }
            );
            return response;
        },
        []
    );

    const { mutateAsync, isPending } = useMutation({
        mutationFn: signUp,
    });

    return {
        mutationSignUp: mutateAsync,
        isPending,
    };
};
