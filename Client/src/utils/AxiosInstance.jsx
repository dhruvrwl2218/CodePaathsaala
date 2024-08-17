import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true
})

//https://codepaathsaala-3.onrender.com/api/v1/
// http://localhost:8000/api/v1/
axiosInstance.interceptors.request.use(
    config => {
      // Do something before the request is sent
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    response => {
      const { method } = response.config;
  
      // Show a success toast only for POST and PATCH requests
      if ((method === 'post' || method === 'patch') && response.data.message) {
        toast.success(response.data.message);
      }
      // Automatically return the `data` field from the response
      return response.data.data;
    },
    error => {
      // Always show an error toast regardless of the HTTP method
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred');
      }
  
      // Re-throw the error so it can be caught by the try-catch block
      return Promise.reject(error);
    }
  );

  export default axiosInstance;