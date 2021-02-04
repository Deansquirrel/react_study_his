import React from 'react';
import BaseComponentWithStore from '@/components/BaseComponentWithStore';

import { Spin, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import authDef from '@/api/auth.d';
import { authLogin } from '@/api/auth';

import './index.less';

// const handleLogin = (username: string, password: string) => {
//   console.log("username: " + username + " | " + "password: " + password);
// }

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
    console.log('data: ', values.username, values.password);

    let req: authDef.authLoginReq = {
      username: values.username,
      password: values.password,
    };

    this.setState({
      loading: true,
    });

    authLogin(req)
      .then((resp) => {
        console.log(resp);
        // let respR: authDef.authLoginResp = resp.data;
        // console.log(respR.token);
      })
      .catch((error) => {
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
