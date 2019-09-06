import React, {Component} from "react";
import PropTypes from 'prop-types';
import {combineReducers,createStore} from "redux";

import "./manager.css"
import "../../App.css"
import {Button,Layout,Icon,Menu} from "antd";

import {managerState} from "./reducer";
import {
    CollapsedAction, HandleLogoutAction,
    LoadingAction,
    MenuClickAction,
    MenuNewDataAction,
    WsAddressAction,
    WsVersionAction,
    VersionAction
} from "./actions";
import {Welcome} from "../welcome/welcome";
import {Test} from "../test/test";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const defaultState = {
    managerState:{
        loggingOut:false,
        collapsed: false,
        currPage:"",
        version:"",
        wsVersion:"",
        wsAddress:"",
        menuData:{
            menu:[],
            openKeys:[],
            selectedKeys:[],
        },
        handleLogout:f=>f,
    },
};

const store = createStore(
    combineReducers({managerState}),
    defaultState
);


export class Manager extends Component {
    static propTypes = {
        version:PropTypes.string,
        wsVersion:PropTypes.string,
        wsAddress:PropTypes.string,
        handleLogout:PropTypes.func,
    };

    static defaultProps = {
        version:"",
        wsVersion:"",
        wsAddress:"",
        handleLogout:f=>f,
    };

    componentDidMount() {
        this.unsubscribe = store.subscribe(
            ()=>this.forceUpdate()
        );
        const testData = [
            {key:"welcome",icon:"table",title:"Welcome",child:[]},
            {key:"testPage",icon:"table",title:"TestPage",child:[
                    {key:"testPage01",title:"TestPage01"},
                ]}
        ];
        store.dispatch(MenuNewDataAction(testData));
        store.dispatch(HandleLogoutAction(this.props.handleLogout));
        store.dispatch(LoadingAction());
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.version!==prevProps.version){
            console.log("update version");
            store.dispatch(VersionAction(this.props.version));
        }
        if(this.props.wsVersion!==prevProps.wsVersion){
            store.dispatch(WsVersionAction(this.props.wsVersion));
        }
        if(this.props.wsAddress!==prevProps.wsAddress){
            store.dispatch(WsAddressAction(this.props.wsAddress));
        }
    }

    render() {
        return (
            <div className={"rootContainer"}>
                <Button
                    loading={}
                    type={"primary"} onClick={()=>this.props.handleLogout()}>
                    logout
                </Button>
                <br/>
                <span>version:</span><span>{store.getState().managerState.version}</span>
                <br/>
                <span>wsVersion:</span><span>{store.getState().managerState.wsVersion}</span>
                <br/>
                <span>wsAddress:</span><span>{store.getState().managerState.wsAddress}</span>
                {/*<Layout>*/}
                {/*    <Sider*/}
                {/*        width={256}*/}
                {/*        style={{minHeight:'100vh'}}*/}
                {/*        trigger={null}*/}
                {/*        collapsible*/}
                {/*        collapsed={store.getState().managerState.collapsed}>*/}
                {/*        <div className="logo" />*/}
                {/*        <MenuList style={{marginBottom:'80px'}} />*/}
                {/*        <div style={{width:'100%',height:'80px',backgroundColor:'transparent'}} />*/}
                {/*        <div className={"VersionInfo"}*/}
                {/*             style={{display:store.getState().managerState.collapsed?"none":"block"}}>*/}
                {/*            <span>{store.getState().managerState.version}</span>*/}
                {/*            <br/>*/}
                {/*            <span>{store.getState().managerState.wsVersion}</span>*/}
                {/*        </div>*/}
                {/*    </Sider>*/}
                {/*    <Layout>*/}
                {/*        <Header style={{ background: '#fff', padding: 0 , width: '100%' }}>*/}
                {/*            <Icon*/}
                {/*                className="trigger"*/}
                {/*                type={store.getState().managerState.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                {/*                onClick={()=>store.dispatch(CollapsedAction())}*/}
                {/*            />*/}
                {/*            <div className={"rightHeader"}>*/}
                {/*                <Button type={"link"}*/}
                {/*                        onClick={()=>store.getState().managerState.handleLogout()}>*/}
                {/*                    <Icon type="logout" />Logout*/}
                {/*                </Button>*/}
                {/*            </div>*/}
                {/*        </Header>*/}
                {/*        <Content style={{margin: '24px 16px',padding: 24,background: '#fff'}}>*/}
                {/*            <PageContent />*/}
                {/*        </Content>*/}
                {/*    </Layout>*/}
                {/*</Layout>*/}
            </div>
        )
    }
}

const MenuList = () => {
    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={store.getState().managerState.menuData.selectedKeys}
            defaultOpenKeys={store.getState().managerState.menuData.openKeys}
        >
            {store.getState().managerState.menuData.menu.map((item)=>{
                if (item.child&&item.child.length > 0){
                    return (
                        <SubMenu
                            key={item.key}
                            title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                            {item.child.map((subItem)=>{
                                return (
                                    <Menu.Item key={subItem.key}
                                               onClick={()=>store.dispatch(MenuClickAction(subItem.key))} >
                                        <span>{subItem.title}</span>
                                    </Menu.Item>
                                )
                            })}
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={item.key} onClick={()=>store.dispatch(MenuClickAction(item.key))}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Menu.Item>
                    )
                }
            })}
        </Menu>
    )
};

const PageContent = () => {
    switch (store.getState().managerState.currPage) {
        case "welcome":
            return <Welcome/>;
        case "testPage01":
            return <Test/>;
        default:
            return <Welcome/>;
    }
};

//
// const refreshVersion = (address="") => {
//     if(address===""){
//         return
//     }
//     if(store.getState().managerState.wsVersion===""){
//         // GetWsVersionInfo(
//         //     address,
//         //     (wsVersion)=>store.dispatch(WsVersionAction(wsVersion)),
//         //     (err)=>console.log(err)
//         //     ).then();
//         GetWsVersionInfoT(address).then();
//     }
// };



// const wsAddress = this.props.wsAddress;
// console.log(wsAddress);
// if(wsAddress!==""&&store.getState().managerState.wsAddress === ""){
//     store.dispatch(WsAddressAction(wsAddress));
// }
// const wsVersion = store.getState().managerState.wsVersion;
// if(wsAddress !== "" && wsVersion === ""){
//     GetWsVersionInfo(
//         wsAddress,
//         (wsVersion)=>store.dispatch(WsVersionAction(wsVersion)),
//         (err)=>console.log(err)
//     ).then();
// }
