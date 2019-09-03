import C from "constants"

export const collapsed = (state=false,action={}) => {
    switch (action.type) {
        case C.Collapsed:
            return !state;
        default:
            return state;
    }
};

export const currPage = (state="",action={}) => {
    console.log("r");
    console.log(action.page);

    switch (action.type) {
        case C.CurrPage:
            return action.page;
        default:
            return state;
    }
};
