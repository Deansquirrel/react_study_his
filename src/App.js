import React, { Component } from 'react';
import {message} from 'antd';
import {ConfigProvider} from "antd";

import zhCN from 'antd/lib/locale-provider/zh_CN';

import './App.css';

import moment from "moment";
import 'moment/locale/zh-cn';
import {Manager} from "./pages/manager/manager";
import {combineReducers, createStore} from "redux";
import {GetWsAddress} from "./pages/common";
import {Login} from "./pages/login/login";

moment.locale('zh-cn');
message.config({
    top:60,
});

class App extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(
            ()=>this.forceUpdate()
        );
        GetWsAddress(
            (address)=>store.dispatch(WsAddressAction(address)),
            (err)=>console.warn(err)
        ).then();
    }

    componentWillUnmount() {
        this.unsubscribe()
    }


  render() {
        return (
            <ConfigProvider  locale={zhCN}>
                <PageContent />
            </ConfigProvider>
        );
  }
}

export default App;


const PageContent = () => {
    switch (store.getState().appState.currPage) {
        case "manager":
            return <Manager
                wsAddress={store.getState().appState.wsAddress}
                handleLogout={()=>handleLogout()}
            />;
        default:
            return <Login handleLogin={(user="",pwd="")=>handleLogin(user , pwd)}/>;
    }
};

const handleLogin = (user="",pwd="") => {
    console.log(user);
    console.log(pwd);
    // store.dispatch(CIdAction(cId));
    store.dispatch(CurrPageAction("manager"));
};

const handleLogout = () => {
    console.log("fseg");
    store.dispatch(CurrPageAction("login"));
};


const C = {
    WsAddress:"WS_ADDRESS",
    CId:"C_ID",
    CurrPage:"CURR_PAGE",
};

const WsAddressAction = (wsAddress="") => (
    {
        type:C.WsAddress,
        wsAddress:wsAddress
    }
);

const CIdAction = (cId="") => (
    {
        type:C.CId,
        cId:cId,
    }
);

const CurrPageAction = (page="") => (
    {
        type:C.CurrPage,
        currPage:page,
    }
);

const appState = (state={},action={}) => {
    switch (action.type) {
        case C.WsAddress:
            return {
                ...state,
                wsAddress: action.wsAddress
            };
        case C.CId:
            return {
                ...state,
                cId:action.cId,
            };
        case C.CurrPage:
            return {
                ...state,
                currPage:action.currPage
            };
        default:
            return state;
    }
};

const defaultState = {
    appState:{
        wsAddress:"",
        currPage:"manager",
        cId:"",
    },
};

const store = createStore(
    combineReducers({appState}),
    defaultState
);
