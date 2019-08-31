import React,{Component} from "react";
import {Descriptions,Button} from "antd";

import "./MyPage0002.css";
import moment from "moment";

import {addColor,removeColor,rateColor,sortColor} from "../Context/action";
import {combineReducers, createStore} from "redux";
import {colors, sort} from "../Context/reducer";

export class MyPage0002 extends Component {
    componentWillMount() {
        this.unsubscribe = store.subscribe(
            ()=>this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const colorList = store.getState().colors;
        const sortBy = store.getState().sort;
        return (
            <div>
                <h1>MyPage0002</h1>
                <div>
                    <Button type="primary" onClick={()=>store.dispatch(addColor())}>AddColor</Button>
                    <Button type="primary" className={"Btn"} onClick={()=>store.dispatch(sortColor())}>SortColor</Button>
                </div>
                <div className={"DivSort"}>
                    <span>Sort:{sortBy}</span>
                </div>
                <div>
                    <DivColorList colors={colorList} />
                </div>
            </div>
        )
    }
}

const defaultState = {
    colors:[],
    sort:"SORTED_BY_DATE",
};

const store = createStore(
    combineReducers({colors,sort}),
    defaultState
);

const DivColorList = ({colors=[]}) => {
    return (
        <div>
            {colors.map((color) => <DivColor key={color.id} color={color}/>)}
        </div>
    )
};

const DivColor = ({color={id:"",color:"",title:"",rating:0,timestamp:new moment()}}) => {
    return <div className={"DivColor"}>
        <Descriptions title={DivTitle(color.id)}>
            <Descriptions.Item label="Id">{color.id}</Descriptions.Item>
            <Descriptions.Item label="Color">{color.color}</Descriptions.Item>
            <Descriptions.Item label="Title">{color.title}</Descriptions.Item>
            <Descriptions.Item label="Rate">{color.rating}</Descriptions.Item>
            <Descriptions.Item label="TimeStamp">{color.timestamp.toString()}</Descriptions.Item>
        </Descriptions>
        <Button
            type={"danger"}
            className={"BtnRemoveColor"}
            onClick={()=>store.dispatch(removeColor(color.id))}
        >
            RemoveColor
        </Button>
        <Button
            type={"primary"}
            className={"Btn"}
            icon={"like"}
            onClick={()=>store.dispatch(rateColor(color.id,color.rating + 1))}
        />
        <Button
            type={"primary"}
            className={"Btn"}
            icon={"dislike"}
            onClick={()=>store.dispatch(rateColor(color.id,color.rating > 0?color.rating-1:0))}
        />
    </div>
};

const DivTitle = (id) => `DivColor(${id})`;
