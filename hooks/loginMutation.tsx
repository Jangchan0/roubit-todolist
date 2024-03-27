import fetchData from './fetch';

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

const signInMutation = async (userInput: login) => {
    try {
        const { data } = await fetchData(loginMutationQuery, { loginInput: userInput });
        return data;
    } catch (err) {
        throw new Error('Failed to fetch login');
    }
};

export default signInMutation;
