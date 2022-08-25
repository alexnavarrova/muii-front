import axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = 'http://ec2-13-58-25-32.us-east-2.compute.amazonaws.com/api';
export default instance;
