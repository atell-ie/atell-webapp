import { useMemo } from "react";
import { useSelector } from "react-redux";

export default (assetId) => {
    const { auditAssets } = useSelector((state) => state);
    const asset = useMemo(() => {
        if (!assetId) return;
        const index = auditAssets.byId[assetId];
        if (index === undefined || index === null) return;

        return auditAssets.data[index];
    }, [auditAssets]);

    return asset;
};
