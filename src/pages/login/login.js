import React, {Component} from "react";
import PropTypes from 'prop-types';
// import { Form,Icon, Input,Button } from 'antd';
import { Button } from 'antd';
import "./login.css"
import {combineReducers, createStore} from "redux";
import {loginState} from "./reducer";
import {VersionAction,
    WsVersionAction,
    WsAddressAction,
    LoggingInAction,
    HandleLoginSuccessAction} from "./actions";

const defaultState = {
    loginState:{
        loggingIn:false,
        version:"",
        wsVersion:"",
        wsAddress:"",
        handleLoginSuccess:f=>f,
    },
};

const store = createStore(
    combineReducers({loginState}),
    defaultState
);

export class Login extends Component {

    static propTypes = {
        version:PropTypes.string,
        wsVersion:PropTypes.string,
        wsAddress:PropTypes.string,
        handleLoginSuccess:PropTypes.func,
    };

    static defaultProps = {
        version:"",
        wsVersion:"",
        wsAddress:"",
        handleLoginSuccess:f=>f,
    };

    componentDidMount() {
        this.unsubscribe = store.subscribe(
            ()=>this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.version!==prevProps.version){
            store.dispatch(VersionAction(this.props.version));
        }
        if(this.props.wsVersion!==prevProps.wsVersion){
            store.dispatch(WsVersionAction(this.props.wsVersion));
        }
        if(this.props.wsAddress!==prevProps.wsAddress){
            store.dispatch(WsAddressAction(this.props.wsAddress));
        }
        if(this.props.handleLoginSuccess!==prevProps.handleLoginSuccess){
            store.dispatch(HandleLoginSuccessAction(this.props.handleLoginSuccess));
        }
    }

    render() {
        // this.props.handleLoginSuccess("segseg");
        return (
            <div>
                {/*<LoginForm*/}
                {/*    title={"登   录"}*/}
                {/*    disabled={this.state.isLoggingIn}*/}
                {/*    handleLogin={(username,password)=> this.handleLogin(username,password)}*/}
                {/*/>*/}
                {/*<div className={"VersionInfo"} style={{color:'white'}}>*/}
                {/*    <span>0.0.0 Build20190101</span>*/}
                {/*</div>*/}
                <Button
                    loading={store.getState().loginState.loggingIn}
                    type={"primary"} onClick={()=>handleLogin()}>
                    login
                </Button>
                <br/>
                <span>version:</span><span>{store.getState().loginState.version}</span>
                <br/>
                <span>wsVersion:</span><span>{store.getState().loginState.wsVersion}</span>
                <br/>
                <span>wsAddress:</span><span>{store.getState().loginState.wsAddress}</span>
            </div>
        )
    }
}

const handleLogin = ()=>{
    store.dispatch(LoggingInAction(true));
    setTimeout(function(){
        store.getState().loginState.handleLoginSuccess("new cId");
        store.dispatch(LoggingInAction(false));
    },1000);
};
//
// class LoginFormR extends React.Component {
//     handleSubmit = e => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 // console.log('Received values of form: ', values);
//                 this.handleLogin(values["username"],values["password"])
//             }
//         });
//     };
//
//     handleLogin(username,password){
//         this.props.handleLogin(username,password)
//     }
//
//     componentDidMount() {
//         document.getElementById("normal_login_username").focus();
//     }
//
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <div className={"login-form"}>
//                 <h1>{this.props.title?this.props.title:"Login in"}</h1>
//                 <Form style={{marginTop:'50px'}} onSubmit={this.handleSubmit}>
//                      <Form.Item>
//                          {getFieldDecorator('username', {
//                              rules: [{ required: true, message: 'Please input your username!' }],
//                          })(
//                              <Input size={"large"}
//                                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                  placeholder="Username"
//                              />,
//                          )}
//                      </Form.Item>
//                     <Form.Item>
//                           {getFieldDecorator('password', {
//                             rules: [{ required: true, message: 'Please input your Password!' }],
//                             })(
//                          <Input size={"large"}
//                              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                              type="password"
//                              placeholder="Password"
//                          />,
//                      )}
//                     </Form.Item>
//                     <Form.Item>
//                         <Button
//                             loading={this.props.disabled}
//                             type="primary"
//                             style={{width:'100%',marginTop:'30px'}}
//                             size={"large"}
//                             htmlType="submit"
//                             className="login-form-button">
//                             {!this.props.disabled?"Log in":"Logging in"}
//                         </Button>
//                     </Form.Item>
//
//                 </Form>
//             </div>
//         )
//     }
// }
//
// const LoginForm = Form.create({ name: 'normal_login' })(LoginFormR);
