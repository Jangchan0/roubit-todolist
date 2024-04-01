import axios, { AxiosRequestConfig } from 'axios';

const fetchData = async (query: {}, variables?: {}, headers?: {}) => {
    try {
        const config: AxiosRequestConfig = {
            method: 'post',
            data: {
                query,
                variables,
            },
            headers,
        };
        axios.defaults.baseURL = 'http://localhost:8080/graphql';
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('todoAccessToken')}`;
        const { data } = await axios(config);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};

export default fetchData;
