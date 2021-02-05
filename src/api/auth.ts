import request from '@/utils/request';
import constant from '@/constant/index';
import authDef from './auth.d';

const baseUrl = constant.BASE_URL + '/auth';

const REQUEST_URL = (url: string) => {
  return '' + baseUrl + url;
};

export const authLogin = (
  req: authDef.authLoginReq,
): Promise<authDef.authLoginResp> => {
  return request<authDef.authLoginResp>({
    url: REQUEST_URL('/login'),
    data: req,
    method: 'post',
  });
};

export const authCheck = (
  req: authDef.authCheckReq,
): Promise<authDef.authLoginResp> => {
  return request<authDef.authLoginResp>({
    url: REQUEST_URL('/check'),
    data: req,
    method: 'post',
  });
};
