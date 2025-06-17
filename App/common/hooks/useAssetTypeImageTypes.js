import { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Use Asset-type Image-types Hook
 */
export default (typeId: number) => {
    const { typesList } = useSelector((state) => state);
    const next = useMemo(() => {
        if (typeId) {
            const { assetImageTypes, imageTypes } = typesList;
            const assetImageTypeIds = assetImageTypes.data
                .filter((item) => item.assetTypeId === typeId)
                .map((item) => item.imageTypeId);
            return imageTypes.data.filter(({ id }) =>
                assetImageTypeIds.includes(id)
            );
        }
        return [];
    }, [typeId, typesList]);

    return next;
};
