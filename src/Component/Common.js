import React,{Component} from "react";
import {PropTypes} from 'prop-types';

import "./Common.css"

export const Star = ({selected=false,onClick=f=>f})=><div className={(selected)?"star selected":"star"} onClick={onClick} />;

Star.propTypes = {
    selected:PropTypes.bool,
    onClick:PropTypes.func,
};

export class StarRating extends Component {
    constructor(props){
        super(props);
        this.state = {
            startsSelected:0,
        };
        this.change.bind(this);
    }

    change = (startsSelected) => {
        this.setState({startsSelected});
    };

    render() {
        const {totalStars} = this.props;
        const {startsSelected} = this.state;
        const strTitle = `${startsSelected} of ${totalStars}`;
        const intW = totalStars * 29;
        const w = "" + intW + "px";

        return (
            <div className={"star-rating"} style={{width:w}}>
                {[...Array(totalStars)].map((n,i)=>
                    <Star
                        key={i}
                        selected={i<startsSelected}
                        onClick={()=>this.change(i+1)}
                    />
                )}
                <div className={"clear"} />
                <div style={{textAlign:"center",width:"100%"}}>{strTitle}</div>
            </div>
        )
    }
}

StarRating.propTypes = {
    totalStars:PropTypes.number,
};

StarRating.defaultProps = {
    totalStars:5,
};
