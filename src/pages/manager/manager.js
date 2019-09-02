import React, {Component} from "react";
import {combineReducers,createStore} from "redux";

import {MenuList} from "./menu/menu"

import "./manager.css"
// import { Layout, Menu, Icon, Button } from 'antd';

export class Manager extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(
            ()=>this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        // const selfVersion = store.getState.SelfVersion;
        // const serviceVersion = store.getState.ServiceVersion;
        // const currPage = store.getState.CurrPage;
        // const menuOpenKeys = store.getState.MenuOpenKeys;
        // const menuData = store.getState.MenuData;

        // const c = store.getState.Collapsed;
        const md = [
            {key:"welcome",icon:"table",title:"Welcome",child:[]},
            {key:"welcome2",icon:"table",title:"Welcome2",child:[]},
            {key:"test",icon:"table",title:"Test",child:[
                    {key:"testPage",title:"TestPage"}
                ]
            },
            {key:"test2",icon:"table",title:"Test2",child:[
                    {key:"testPage2",title:"TestPage2"}
                ]
            },
        ];

        return (
            <div className={"rootContainer"}>
                <MenuList menuData={md} onClickMenu={(id)=>{console.log(id)}} />
                <PageLoader />
            </div>
        );
    }
}

const PageLoader = () => {
    return <div>PageLoader</div>
};


















const C ={
    T:"T",
    Collapsed:"Collapsed",
    ClickMenu:"ClickMenu",
};

// const collapsedAction = () => (
//     {
//         type:C.Collapsed,
//     }
// );
//
// //type 0 menu 1 submenu
// const clientMenuAction = (type,key) => (
//     {
//         type:C.ClickMenu,
//         clickType:type,
//         key:key,
//     }
// );

const managerReducerCollapsed = (state=false, action={}) => {
    switch (action.type) {
        case C.Collapsed:
            return !state;
        case C.T:
            return state;
        default:
            return state;
    }
};


const defaultState = {
    // SelfVersion:"",
    // ServiceVersion:"",
    // Collapsed:false,
    // CurrPage:"",
    // MenuData:[
    //     {key:"welcome",icon:"table",title:"Welcome"},
    //     {key:"test",icon:"table",title:"Test",child:[
    //             {key:"testPage",title:"TestPage"}
    //         ]
    //     },
    // ],
};

const store = createStore(
    combineReducers({managerReducerCollapsed}),
    defaultState
);

