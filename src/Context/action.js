import C from "./constants";
import uuid from "uuid";
import moment from "moment";

export const addColor = (color="#ffffff",title="title") => (
    {
        type:C.ADD_COLOR,
        id:uuid.v4().toUpperCase(),
        color:color,
        title:title,
        timestamp: new moment()
    }
);

export const removeColor = (id="") => (
    {
        type:C.REMOVE_COLOR,
        id:id,
    }
);

export const rateColor = (id="",rating=0) => (
    {
        type:C.RATE_COLOR,
        id:id,
        rating:rating,
    }
);

export const sortColor = () => (
    {
        type:C.SORT_COLORS,
        sortBy:"SORTED_BY_TITLE",
    }
);
