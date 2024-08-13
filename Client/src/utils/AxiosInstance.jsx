import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true
})

export default axiosInstance;

//https://codepaathsaala-3.onrender.com/api/v1/
// http://localhost:8000/api/v1/
