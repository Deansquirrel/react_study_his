import React,{Component} from 'react';
import {v4} from 'uuid'
// import PropTypes from 'prop-types';
import {StarRating} from "../Component/Common"

import "./MyPageOne.css"

export class MyPageOne extends Component {
    constructor(props){
        super(props);
        this.state={
            colors:[],
        };
        this.addColor.bind(this);
        this.rateColor.bind(this);
        this.removeColor.bind(this);
    }

    addColor = (title,color) => {
      const colors = [
          ...this.state.colors,
          {
              id:v4(),
              title,
              color,
              rating:0,
          }
      ];
      this.setState(colors)
    };

    rateColor = (id,rating) => {
      const colors = this.state.colors.map(color=>
          (color.id!==id)?color:{...color,rating}
      );
      this.setState(colors)
    };

    removeColor=(id)=>{
      const colors = this.state.color.filter(color=>color.id !==id);
      this.setState(colors)
    };

    render() {
        return (
            <div className={"divCon"}>
                <StarRating totalStars={8} />
                <br/>
                <StarRating />
            </div>
        )
    }
}
