import localStorageItem from '@/constant/localStorageItem';
import authUtils from '@/utils/auth';
import { Button } from 'antd';
import React from 'react';
import { history } from 'umi';
import './index.less';

const Welcome = () => {
  const token = localStorage.getItem(localStorageItem.TOKEN);
  const logoff = () => {
    authUtils.authLogoff();
    history.push('/');
  };
  return (
    <div>
      <h3>token</h3>
      <span>{token}</span>
      <br />
      <br />
      <Button type={'primary'} onClick={logoff}>
        注销
      </Button>
    </div>
  );
};

export default Welcome;
