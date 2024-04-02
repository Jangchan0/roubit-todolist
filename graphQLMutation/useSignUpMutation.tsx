import { AxiosResponseType, RejectType } from '@/app/types/common';
import { gql } from 'graphql-request';
import { useMutation } from '@tanstack/react-query';
import { getGraphQLClient } from '@/reactQuery/graphQLClient';

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

const useSignUpMutation = () => {
    const signUp = async (
        data: signUpArgumentsType
    ): Promise<SignUpResponse<ReturnSignUpResponseType> | SignUpRejectType> => {
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
    };

    const { mutateAsync, isPending } = useMutation({
        mutationFn: signUp,
    });

    return {
        mutationSignUp: mutateAsync,
        isPending,
    };
};

export default useSignUpMutation;
