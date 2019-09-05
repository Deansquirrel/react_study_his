import C from "./constants";

export const LoadingAction = () => (
    {
        type:C.Loading
    }
);

export const CollapsedAction = () => (
    {
        type:C.Collapsed
    }
);

export const VersionAction = (version="") => (
    {
        type:C.Version,
        version:version
    }
);

export const WsVersionAction = (wsVersion="") => (
    {
        type:C.WsVersion,
        wsVersion:wsVersion
    }
);

export const WsAddressAction = (wsAddress="") => (
    {
        type:C.WsAddress,
        wsAddress:wsAddress
    }
);

export const MenuNewDataAction = (menu=[]) => (
    {
        type:C.MenuNewData,
        menu:menu,
    }
);

export const MenuClickAction = (page="") => (
    {
        type:C.MenuClick,
        page:page,
    }
);

export const HandleLogoutAction = (handleLogout=f=>f) => (
    {
        type:C.HandleLogout,
        handleLogout:handleLogout,
    }
);
