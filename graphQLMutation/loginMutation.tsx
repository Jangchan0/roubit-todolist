import { AxiosResponseType } from '@/app/types/common';
import fetchData from '../sagas/Axios/fetch';

const loginMutationQuery = `
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

interface login {
    email: string;
    password: string;
}

export type ReturnAccessTokenType = {
    accessToken: string;
};

export type SignInResponse<T extends ReturnAccessTokenType> = { signIn: AxiosResponseType<T> };

const signInMutation = async (userInput: login): Promise<SignInResponse<ReturnAccessTokenType>> => {
    try {
        const { data } = await fetchData(loginMutationQuery, { loginInput: userInput });
        return data;
    } catch (err) {
        throw new Error('Failed to fetch login');
    }
};

export default signInMutation;
