import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-13-58-25-32.us-east-2.compute.amazonaws.com/api/';

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token');

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const requestGenerico = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url)
};

export default requestGenerico;
