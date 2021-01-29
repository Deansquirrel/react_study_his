import request from '@/utils/request';
import authReq from './auth.d';
import constant from '@/constant/index';

const baseUrl = '' + constant.BASE_URL + '/auth';

const REQUEST_URL = (url: string) => {
  return '' + baseUrl + url;
};

export const authLogin = (req: authReq.authLoginReq): Promise<any> => {
  const url = REQUEST_URL('/login');
  return request({
    url: url,
    method: 'post',
    // data: req,
    params: req,
  });
};
