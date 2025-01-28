import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://product-hunt-server-rho.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;