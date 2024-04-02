import axios from 'axios';

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_DOMAIN });

axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('todoAccessToken');
axios.defaults.headers.common['content-type'] = 'application/json';

export default axiosInstance;
