import axios from 'axios';

const service = axios.create({
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    // config.headers['X-Token'] = 'test token';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code) {
      console.log('code', res.code);
      if (res.code !== '0000') {
        if (res.message && res.message !== '') {
          return Promise.reject(res.message);
        } else {
          return Promise.reject('error');
        }
      }
      return res.data;
    } else {
      console.log('code none');
      return Promise.reject('unkonw code');
    }
  },
  (error) => {
    console.log(error.response);
    const res = error.response && error.response.data;
    console.log('error', res);
    //Todo 给出api错误提示
    return Promise.reject(error);
  },
);

export default service;
