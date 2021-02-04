import request from '@/utils/request';
import constant from '@/constant/index';
import authDef from './auth.d';
import baseDef from './base.d';
import { AxiosPromise } from 'axios';

const baseUrl = constant.BASE_URL + '/auth';

const REQUEST_URL = (url: string) => {
  return '' + baseUrl + url;
};

export const authLogin = (
  req: authDef.authLoginReq,
): AxiosPromise<authDef.authLoginResp> => {
  return request({
    url: REQUEST_URL('/login'),
    data: req,
    method: 'post',
  });
};
