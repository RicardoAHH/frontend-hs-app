import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://www.hs-service.api.crealape.com/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.response?.status === 401 && window.location.pathname !== '/login') {
        window.location.href = '/#/login';
    }

    return Promise.reject(error);
});


export default instance;

