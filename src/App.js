import React, { Component } from 'react';
import {message} from 'antd';
import {ConfigProvider} from "antd";

import zhCN from 'antd/lib/locale-provider/zh_CN';


import './App.css';

import moment from "moment";
import 'moment/locale/zh-cn';
import {Manager} from "./pages/manager/manager";

moment.locale('zh-cn');
message.config({
    top:60,
});

class App extends Component {
  render() {
    return (
        <ConfigProvider  locale={zhCN}>
            <Manager />
        </ConfigProvider>
    );
  }
}

export default App;
