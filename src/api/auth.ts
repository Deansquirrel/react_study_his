import request from '@/utils/request';
import authReq from './auth.d';
import constant from '@/constant';

const baseUrl = constant.BACK_URL + '/auth';

const REQUEST_URL = (url: string) => {
  return baseUrl + url;
};

export const authLogin = (req: authReq.authLoginReq): Promise<any> => {
  const url = REQUEST_URL('/login');
  console.log(url);
  return request({
    url: url,
    method: 'post',
    // data: req,
    params: req,
  });
};
