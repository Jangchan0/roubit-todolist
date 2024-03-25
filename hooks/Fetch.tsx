import axios, { AxiosResponse } from 'axios';

type MethodType = 'get' | 'put' | 'delete' | 'post';

const fetchData = (method: MethodType, address: string, data?: any): Promise<AxiosResponse<any>> => {
    switch (method) {
        case 'get':
            return axios.get(address);
        case 'put':
            return axios.put(address, data);
        case 'delete':
            return axios.delete(address);
        case 'post':
            return axios.post(address, data);
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
};

export default fetchData;
