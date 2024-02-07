import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://openmarket.weniv.co.kr',
  withCredentials: true,
});

export default instance;
