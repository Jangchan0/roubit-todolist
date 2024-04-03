import request from 'graphql-request';

const useRequest = async (variables: {}, query: string) => {
    const baseURL = 'http://localhost:8080/graphql';
    try {
        const response = await request(baseURL, query, variables);
        return response;
    } catch (error) {
        throw new Error('Failed');
    }
};

export default useRequest;
