import authDef from '@/api/auth.d';
import authAPI from '@/api/auth';
import localStorageItem from '@/constant/localStorageItem';
import { message } from 'antd';

const setLoginInfo = (token: string, expire: number) => {
  localStorage.setItem(localStorageItem.TOKEN, token);
  localStorage.setItem(localStorageItem.TOKEN_EXPIRE, expire.toString());
};

const clearLoginInfo = () => {
  localStorage.removeItem(localStorageItem.TOKEN);
  localStorage.removeItem(localStorageItem.TOKEN_EXPIRE);
};

namespace authUtils {
  export const authLogin = async (username: string, password: string) => {
    const req: authDef.authLoginReq = {
      username: username,
      password: password,
    };

    var resp: authDef.authLoginResp | undefined = undefined;
    try {
      resp = await authAPI.authLogin(req);
    } catch (error) {
      console.log(error);
      message.error(error);
      return;
    }

    if (resp && resp.id && resp.token && resp.expire) {
      setLoginInfo(resp.token, resp.expire);
    } else {
      //登录异常
      console.log('登录返回数据结构异常', resp);
      clearLoginInfo();
    }
  };

  export const authLogoff = () => {
    clearLoginInfo();
  };

  export const authLogCheck = (): boolean => {
    const token = localStorage.getItem(localStorageItem.TOKEN);
    const expire = localStorage.getItem(localStorageItem.TOKEN_EXPIRE);
    if (
      token &&
      expire &&
      Number(expire) &&
      new Number(expire) > new Date().getTime()
    ) {
      return true;
    } else {
      return false;
    }
  };
}

export default authUtils;
