import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL;
const Axios: AxiosInstance = axios.create({
    timeout: 60000,
    baseURL: `${apiBaseUrl}/`
});



export default Axios