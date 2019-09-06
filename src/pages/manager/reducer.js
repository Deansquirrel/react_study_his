import C from "./constants"
import {GetMenuOpenKeys, GetMenuSelectedKeys} from "./common";

export const managerState = (state={},action={}) => {
    switch (action.type) {
        case C.LoggingOut:
            return {
                ...state,
                loggingOut:action.loggingOut
            };
        case C.Collapsed:
            return {
                ...state,
                collapsed:!state.collapsed,
            };
        case C.CurrPage:
            return {
                ...state,
                currPage:action.currPage,
            };
        case C.Version:
            return {
                ...state,
                version:action.version,
            };
        case C.WsVersion:
            return {
                ...state,
                wsVersion:action.wsVersion,
            };
        case C.WsAddress:
            return {
                ...state,
                wsAddress: action.address,
            };
        case C.MenuNewData:
            return {
                ...state,
                menuData:menuData(state.menuData,action)
            };
        case C.MenuClick:
            return {
                ...state,
                currPage: action.page,
                menuData:menuData(state.menuData,action)
            };
        case C.HandleLogout:
            return {
                ...state,
                handleLogout:action.handleLogout,
            };
        default:
            return state;
    }
};

const menuData = (state={},action={}) => {
    switch (action.type) {
        case C.MenuNewData:
            const selectedKeys = GetMenuSelectedKeys(action.menu);
            const openKeys = GetMenuOpenKeys(action.menu);
            return {
                ...state,
                menu:action.menu,
                openKeys:openKeys,
                selectedKeys:selectedKeys,
            };
        case C.MenuClick:
            const selectedKeysChange = GetMenuSelectedKeys(state.menu,action.page);
            const openKeysChange = GetMenuOpenKeys(state.menu,action.page);
            return {
                ...state,
                menu:state.menu,
                openKeys:openKeysChange,
                selectedKeys:selectedKeysChange,
            };
        default:
            return state;
    }
};
