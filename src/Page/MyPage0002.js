import React,{Component} from "react";
import {Descriptions,Button} from "antd";
import {createStore,combineReducers} from 'redux';
import uuid from "uuid";

import "./MyPage0002.css";
import moment from "moment";

export class MyPage0002 extends Component {
    constructor(props){
        super(props);
        this.state = {
            colors:[],
            sort:"",
        }
    }

    handleAddColor = () => {
        const actionAddColor = {
            type:C.ADD_COLOR,
            id:uuid.v4().toUpperCase(),
            color:"#0000ff",
            title:"Big Blue",
            timestamp: new moment()
        };
        store.dispatch(actionAddColor);
    };

    handleSortColor = () => {
        const sortColor = {
            type:C.SORT_COLORS,
            sortBy:"SORTED_BY_TITLE",
        };
        store.dispatch(sortColor);
    };

    componentDidMount() {

        this.setState({
            colors:store.getState().colors,
            sort:store.getState().sort,
        });

        store.subscribe(()=>{
            this.setState({
                colors:store.getState().colors,
                sort:store.getState().sort,
            });
        });
    };

    render() {
        const colorList = this.state.colors;
        const sortBy = this.state.sort;
        return (
            <div>
                <h1>MyPage0002</h1>
                <div>
                    <Button type="primary" onClick={this.handleAddColor}>AddColor</Button>
                    <Button type="primary" className={"Btn"} onClick={this.handleSortColor}>SortColor</Button>
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

const DivColor = ({color={id:"",color:"",title:"",rating:0,timestamp:new moment()}}) => {
    return <div className={"DivColor"}>
        <Descriptions title={DivTitle(color.id)}>
            <Descriptions.Item label="Id">{color.id}</Descriptions.Item>
            <Descriptions.Item label="Color">{color.color}</Descriptions.Item>
            <Descriptions.Item label="Title">{color.title}</Descriptions.Item>
            <Descriptions.Item label="Rate">{color.rating}</Descriptions.Item>
            <Descriptions.Item label="TimeStamp">{color.timestamp.toString()}</Descriptions.Item>
        </Descriptions>
    </div>
};

const DivTitle = (id) => `DivColor(${id})`;

const DivColorList = ({colors=[]}) => {
    return (
        <div>
            {colors.map((color) => <DivColor key={color.id} color={color}/>)}
        </div>
    )
};

const constants = {
    SORT_COLORS:"SORT_COLORS",
    ADD_COLOR:"ADD_COLOR",
    RATE_COLOR:"RATE_COLOR",
    REMOVE_COLOR:"REMOVE_COLOR"
};

const C = constants;

const color = (state={},action={}) => {
    switch (action.type) {
        case C.ADD_COLOR:
            return {
                id:action.id,
                title:action.title,
                color:action.color,
                timestamp:action.timestamp,
                rating:0
            };
        case C.RATE_COLOR :
            return (state.id !== action.id) ?
                state:
                {
                    ...state,
                    rating:action.rating
                };
        default:
            return state
    }
};

const colors = (state={},action={}) => {
  switch (action.type) {
      case C.ADD_COLOR:
          return [
              ...state,
              color({},action)
          ];
      case C.RATE_COLOR :
          return state.map(c => color(c,action));
      case C.REMOVE_COLOR:
          return state.filter(c => c.id !== action.id);
      default:
          return state
  }
};

const sort = (state="SORTED_BY_DATE",action) => {
    switch (action.type) {
        case C.SORT_COLORS:
            return action.sortBy;
        case C.REMOVE_COLOR:
            return state;
        default:
            return state
    }
};

const defaultState = {
    colors:[],
    sort:"SORTED_BY_DATE",
};

const store = createStore(
    combineReducers({colors,sort}),
    defaultState
);


// const actionRateColor = {
//   type:C.RATE_COLOR,
//   id:"123-123-123-123",
//   rating:4,
// };

// const colors = (state=[],action) => {
//     return []
// };
//
// const sort = (state="SORTED_BY_DATE",action) => {
//     return ""
// };
