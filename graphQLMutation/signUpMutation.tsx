import { AxiosResponseType } from '@/app/types/common';
import fetchData from '../sagas/Axios/fetch';

const signUpMutationQuery = `
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

type UserInfo = {
    email: string;
    fullName: string;
    username: string;
    password: string;
};

export type ReturnSignUpResponseType = {
    id: string;
    email: string;
    fullName: string;
    username: string;
    password: string;
};

export type SignUpResponse<T extends ReturnSignUpResponseType> = { signUp: AxiosResponseType<T> };

const signUpMutation = async (userInfo: UserInfo): Promise<SignUpResponse<ReturnSignUpResponseType>> => {
    try {
        const { data } = await fetchData(signUpMutationQuery, {
            createUserInput: userInfo,
        });
        return data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw new Error('Failed to sign up');
    }
};

export default signUpMutation;
