import axios from 'axios';

const fetchData = async (query: {}, variables?: {}) => {
    try {
        const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN as string, {
            query,
            variables,
        });
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};

export default fetchData;
