import React, {Component} from "react";
import {combineReducers,createStore} from "redux";

import "./manager.css"
import "../../App.css"
import {Button,Layout,Icon,Menu} from "antd";

import {managerState} from "./reducer";
import {
    CollapsedAction,
    LoadingAction,
    MenuClickAction,
    MenuNewDataAction,
    VersionAction,
    WsVersionAction
} from "./actions";
import {Welcome} from "../welcome/welcome";
import {Test} from "../test/test";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const defaultState = {
    managerState:{
        loading:true,
        collapsed: false,
        currPage:"testPage0101",
        version:"",
        wsVersion:"",
        menuData:{
            menu:[],
            openKeys:[],
            selectedKeys:[],
        },
    },
};

const store = createStore(
    combineReducers({managerState}),
    defaultState
);


export class Manager extends Component {

    componentDidMount() {
        store.dispatch(VersionAction("0.0.0 Build20190101"));
        store.dispatch(WsVersionAction("0.0.1 Build20190101"));
        const testData = [
            {key:"welcome",icon:"table",title:"Welcome",child:[]},
            {key:"testPage",icon:"table",title:"TestPage",child:[
                    {key:"testPage01",title:"TestPage01"},
                ]}
        ];
        store.dispatch(MenuNewDataAction(testData));
        store.dispatch(LoadingAction());
        this.forceUpdate();

        this.unsubscribe = store.subscribe(
            ()=>this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        return (
            <div className={"rootContainer"}>
                <Layout>
                    <Sider
                        width={256}
                        style={{minHeight:'100vh'}}
                        trigger={null}
                        collapsible
                        collapsed={store.getState().managerState.collapsed}>
                        <div className="logo" />
                        <MenuList style={{marginBottom:'80px'}} />
                        <div style={{width:'100%',height:'80px',backgroundColor:'transparent'}} />
                        <div className={"VersionInfo"} style={{display:store.getState().managerState.collapsed?"none":"block"}}>
                            <span>{store.getState().managerState.version}</span>
                            <br/>
                            <span>{store.getState().managerState.wsVersion}</span>
                        </div>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 , width: '100%' }}>
                            <Icon
                                className="trigger"
                                type={store.getState().managerState.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={()=>store.dispatch(CollapsedAction())}
                            />
                            <div className={"rightHeader"}>
                                <Button type={"link"}>
                                    <Icon type="logout" />Logout
                                </Button>
                            </div>
                        </Header>
                        <Content style={{margin: '24px 16px',padding: 24,background: '#fff'}}>
                            <PageContent />
                        </Content>
                    </Layout>
                </Layout>
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
