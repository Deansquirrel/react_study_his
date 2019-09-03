import C from "./constants";

export const CollapsedAction = () => (
    {
        type:C.Collapsed
    }
);

export const CurrPageAction = (page="") => (
    {
        type:C.CurrPage,
        page:page
    }
);
