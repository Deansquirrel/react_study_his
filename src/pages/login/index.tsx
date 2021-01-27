import React from 'react';
import BaseComponentWithStore from '@/components/BaseComponentWithStore';

import { Spin, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.less';

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

  render() {
    return (
      <div id="form-login">
        <h2>Login</h2>
        <Spin spinning={this.state.loading}>
          {/* <Form>

                    </Form> */}
          <Input
            size={'large'}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            autoFocus
          />
          <Input
            size={'large'}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
          <Checkbox>Remember me</Checkbox>

          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Spin>
      </div>
    );
  }
}

export default Login;
