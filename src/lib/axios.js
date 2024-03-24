import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://openmarket.weniv.co.kr',
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    return Promise.reject(error);
  },
);

export default instance;
