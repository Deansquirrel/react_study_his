import React, {Component} from "react";
import {combineReducers,createStore} from "redux";

import "./manager.css"
import {Button} from "antd";
import {Welcome} from "../welcome/welcome";
import {Test} from "../test/test";

import {collapsed,currPage} from "./reducer";
import {CollapsedAction, CurrPageAction} from "./actions";


const defaultState = {
    collapsed: false,
    currPage:"currPage",
    // menuOpenKeys:[],
};

const store = createStore(
    combineReducers({collapsed,currPage}),
    defaultState
);


export class Manager extends Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(
            ()=>this.forceUpdate()
        );

        store.subscribe(
            ()=>console.log(store.getState().currPage)
        );
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const collapsed = store.getState().collapsed;
        const currPage = store.getState().currPage;
        // const openKeys = store.getState().menuOpenKeys;

        return (
            <div>
                <h1>
                    Manager
                </h1>
                <Button type="primary" onClick={()=>store.dispatch(CollapsedAction)}>Collapsed</Button>
                <Button type="primary" onClick={()=>store.dispatch(CurrPageAction("Test Page"))}>CurrPage</Button>
                <Welcome/>
                <Test/>
                <div>
                    <h1>props</h1>
                    <span>collapsed: </span><span>{collapsed?"True":"False"}</span>
                    <br />
                    <span>currPage: </span><span>{currPage}</span>
                    {/*<br />*/}
                    {/*<div>*/}
                    {/*    <h2>open keys</h2>*/}
                    {/*    {openKeys.map((key)=>{*/}
                    {/*        return (*/}
                    {/*            <div>*/}
                    {/*                <span>{key}</span>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}


