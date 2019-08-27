import React from 'react';
import PropTypes from 'prop-types';
import {Affix, LocaleProvider} from 'antd';
import {message} from 'antd';
import { Layout, Menu, Icon, Button } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from "moment";
import 'moment/locale/zh-cn';

import {MyPageOne} from "./Page/MyPageOne";
import {MyPage0001} from "./Page/MyPage0001";
import {MyPage0002} from "./Page/MyPage0002";

import "./App.css"
import $ from 'jquery'

// const preVersionInfo = "1.0.1 Build20190703";
// const testVersionInfo = "0.0.0 Build20190101";
const versionInfo = "0.0.0 Build20190101";
function getCurrVersion() {
    return versionInfo
}

function getDefaultPage(){
    return "MyPage0002"
}

moment.locale('zh-cn');
message.config({
    top:60,
});

export default App;

function App(){
    return (
        <LocaleProvider locale={zhCN}>
            <div className={"rootContainer"}>
                <Container />
            </div>
        </LocaleProvider>
    )
}

class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPage:0,//0-init(null),1-login,-2-pageLoader
            svrAddress:"",
        };
        this.refreshConfig.bind(this);
    }

    componentDidMount() {
        this.refreshConfig();
        this.setState({
            showPage:2,
        });
    }

    refreshConfig = () =>{
        $.ajax({
            url:'../../config.json',
            cache:false,
            dataType:'json',
            success:function(data){
                this.setState({
                    svrAddress:data["address"],
                });
            }.bind(this),
            error:function(e){
                console.log(e.toString());
                this.setState({
                    svrAddress:"",
                });
            }.bind(this)
        });
    };

    render(){
        const defaultPage = getDefaultPage();
        switch (this.state.showPage) {
            case 1:
                return (
                    <div>
                        <span>login</span>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <PageLoader defaultPage={defaultPage} />
                    </div>
                );
            default:
                return (<div>show page error</div>);
        }
    }
}

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class PageLoader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            currPage:"",
            menuOpenKeys:[],
        };
        this.toggle.bind(this);
        this.handleMenuClick.bind(this);
        // this.handleMenuOpenChange.bind(this);
    }

    static propTypes = {
        menuData:PropTypes.array,
        defaultPage:PropTypes.string,
        wsVersion:PropTypes.string,
    };

    static defaultProps = {
        menuData:[],
        defaultPage:"",
        wsVersion:"Version"
    };

    componentWillMount() {
        this.setState({
            currPage:this.props.defaultPage,
        });
    }

    toggle = () => {
        this.setState({
            collapsed:!this.state.collapsed,
        })
    };

    handleMenuClick = (key) => {
        this.setState({
            currPage:key,
        })
    };

    // handleMenuOpenChange = (openKeys) => {
    //     this.setState({
    //         menuOpenKeys:openKeys,
    //     })
    // };

    getSubMenuKey = (menuData,menuKey) => {
        let listMap = new Map();
        menuData.map((item)=>{
            if(item.child.length > 0){
                item.child.map((subItem)=>{
                    listMap[subItem.key]=item.key;
                    return subItem.key
                });
            } else {
                listMap[item.key]=item.key;
            }
            return item.key
        });
        for (let key in listMap){
            if(key === menuKey){
                return listMap[key];
            }
        }
        return "";
    };

    getDefaultOpenKey = (menuData,currPage) =>{
        let list = [];
        const defaultMenu = this.getSubMenuKey(menuData,currPage);
        if(defaultMenu !== ""){
            list.push(defaultMenu);
        }
        return list;
    };

    render() {
        const testData = [
            {key:"MyPage",icon:"table",title:"MyPage",child:[
                    {key:"MyPageOne",title:"MyPageOne"},
                    {key:"MyPage0001",title:"MyPage0001"},
                    {key:"MyPage0002",title:"MyPage0002"}
                ]},
            {key:"menu1",icon:"table",title:"Menu1",child:[
                    {key:"title1",title:"Title1"},
                    {key:"title2",title:"Title2"},
                    {key:"title3",title:"Title3"}
                ]},
            {key:"menu2",icon:"table",title:"Menu2",child:[
                    {key:"title4",title:"Title4"},
                    {key:"title5",title:"Title5"},
                    {key:"title6",title:"Title6"}
                ]},
            {key:"menu3",icon:"table",title:"Menu3",child:[]}
        ];
        const version = getCurrVersion();
        const wsVersion = this.props.wsVersion;
        const currPage = this.state.currPage;
        // const defaultOpenKey = this.state.menuOpenKeys.length > 0 ?
        //     this.state.menuOpenKeys:this.getDefaultOpenKey(testData,currPage);
        const defaultOpenKey = this.getDefaultOpenKey(testData,currPage);
        const collapsed = this.state.collapsed;

        const MenuList = ({mData}) => {
            return (
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[currPage]}
                    defaultOpenKeys={defaultOpenKey}
                    // onOpenChange={this.handleMenuOpenChange}
                >
                    {mData.map((item)=>{
                        if (item.child.length > 0){
                            return (
                                <SubMenu key={item.key} title ={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                                    {item.child.map((subItem)=>{
                                        return (
                                            <Menu.Item key={subItem.key} onClick={()=>this.handleMenuClick(subItem.key)}>
                                                <span>{subItem.title}</span>
                                            </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            )
                        } else {
                            return (
                                <Menu.Item key={item.key}>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </Menu.Item>
                            )
                        }
                    })}
                </Menu>
            )
        };

        return (
            <Layout>
                 <Sider width={256} style={{minHeight:'100vh'}} trigger={null} collapsible collapsed={collapsed}>
                     <div className="logo" />
                     <MenuList mData={testData} defaultKey = {"title5"} defaultOpenKey={"menu2"} />
                     <Affix className={"VersionInfo"} style={{display:this.state.collapsed?"none":"block"}} offsetBottom={16}>
                         <span>{version}</span>
                         <br/>
                         <span>{wsVersion}</span>
                     </Affix>
                 </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 , width: '100%' }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className={"rightHeader"}>
                            <Button type={"link"}>
                                <Icon type="logout" />Logout
                            </Button>
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px',padding: 24,background: '#fff'}}>
                        <PageContent currPage={currPage} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}


class PageContent extends React.Component {

    static propTypes = {
        currPage:PropTypes.string,
    };

    static defaultProps = {
        currPage:"",
    };

    render() {

        const currPage = this.props.currPage;

        switch (currPage){
            case "111":
                return (
                    <div>111</div>
                );
            case "222":
                return (
                    <div>222</div>
                );
            case "MyPageOne":
                return (
                    <MyPageOne/>
                );
            case "MyPage0001":
                return (
                    <MyPage0001/>
                );
            case "MyPage0002":
                return (
                    <MyPage0002/>
                );
            default:
                return (
                    <div>{currPage}</div>
                );
        }
    }
}
