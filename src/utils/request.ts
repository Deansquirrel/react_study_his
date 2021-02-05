import axios, { AxiosResponse } from 'axios';
import responseCode from '@/constant/responseCode';
import baseDef from '@/api/base.d';

const service = axios.create({
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    // config.headers['X-Token'] = 'test token';
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['Accept'] = 'application/json';
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res: baseDef.resp<any> = response.data;
    if (res.code !== undefined) {
      if (res.code !== responseCode.SUCCESS) {
        if (res.message && res.message !== '') {
          return Promise.reject(res.message);
        } else {
          return Promise.reject('error');
        }
      }
      return res.data;
    } else {
      return Promise.reject('unkonw code');
    }
  },
  (error) => {
    const res = error.response && error.response.data;
    console.log('error', res);
    //Todo 给出api错误提示
    return Promise.reject(error);
  },
);

export default service;
