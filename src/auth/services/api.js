import axios from 'axios';

const url='http://localhost:8000';
const instance = axios.create({
    baseURL: `${url}/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'language': 'es'
    },
});

instance.interceptors.request.use(function (config) {
    if (localStorage.getItem('access_token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    let headers = response.headers
    if (headers.authorization !== undefined) {
        setAuthorization(headers.authorization);
    }
    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/";
    }
    return Promise.reject(error);
});

export default instance;