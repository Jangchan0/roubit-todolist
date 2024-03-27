import fetchData from './fetch';

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

interface UserInfo {
    email: string;
    fullName: string;
    username: string;
    password: string;
}

const signUpMutation = async (userInfo: UserInfo) => {
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
