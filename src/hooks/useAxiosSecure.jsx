import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://product-hunt-server-rho.vercel.app'
    // baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    axiosSecure.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && [401, 403].includes(error.response.status)) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;