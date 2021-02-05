import React from 'react';
import BaseComponentWithStore from '@/components/BaseComponentWithStore';

import { Spin, Form, Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import authDef from '@/api/auth.d';
import { authCheck, authLogin } from '@/api/auth';

import './index.less';
import localStorageItem from '@/constant/localStorageItem';
import { history } from 'umi';

interface IState {
  loading: boolean;
}

class Login extends BaseComponentWithStore<{}, IState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onFinish = (values: { username: any; password: any }) => {
    const req: authDef.authLoginReq = {
      username: values.username,
      password: values.password,
    };

    this.setState({
      loading: true,
    });

    authLogin(req)
      .then((resp) => {
        if (resp && resp.id && resp.token && resp.expire) {
          localStorage.setItem(localStorageItem.TOKEN, resp.token);
          localStorage.setItem(
            localStorageItem.TOKEN_EXPIRE,
            resp.expire.toString(),
          );
          history.push('/welcome');
        } else {
          //登录异常
          message.error('登录返回数据结构异常');
        }
      })
      .catch((error) => {
        debugger;
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  onFinishedFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div id="div-login">
        <div style={{ marginBottom: '50px' }}>
          <h2>Login</h2>
        </div>
        <Spin spinning={this.state.loading}>
          <Form onFinish={this.onFinish} onFinishFailed={this.onFinishedFailed}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'please input your username' },
              ]}
            >
              <Input
                size={'large'}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                autoFocus
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'pleasen input your password' },
              ]}
            >
              <Input
                size={'large'}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Checkbox checked>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item>
              <Button
                size={'large'}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Login;
