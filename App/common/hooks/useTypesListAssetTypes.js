import { useMemo } from "react";
import { useSelector } from "react-redux";

export default (typeId) => {
    const { typesList } = useSelector((state) => state);
    const { assetTypes } = typesList;
    const assetType = useMemo(() => {
        if (!typeId) return;
        const index = assetTypes.byId[typeId];
        if (index === undefined || index === null) return;

        return assetTypes.data[index];
    }, [assetTypes]);

    return assetType;
};
