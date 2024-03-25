import axios, { AxiosResponse } from 'axios';

type MethodType = 'get' | 'put' | 'delete';

const fetchData = (method: MethodType, address: string): Promise<AxiosResponse<any>> => {
    switch (method) {
        case 'get':
            return axios.get(address);
        case 'put':
            return axios.put(address);
        case 'delete':
            return axios.delete(address);
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
};

export default fetchData;

// 통신메서드
// 통신 주소
