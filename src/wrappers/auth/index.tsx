import { Redirect } from 'umi';
import localStorageItem from '@/constant/localStorageItem';

export default (props: Readonly<{ children: any }>) => {
  const token = localStorage.getItem(localStorageItem.TOKEN);
  const expire = localStorage.getItem(localStorageItem.TOKEN_EXPIRE);
  if (token && expire && parseInt(expire) > new Date().getTime()) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
