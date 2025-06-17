import React, { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Use Image Types Hook
 */
export default (assetTypeIds: array, exclusionReasonTypeId: number) => {
    const { typesList } = useSelector((state) => state);

    const imageTypes = useMemo(() => {
        if (exclusionReasonTypeId) {
            const { exclusionImageTypes } = typesList;
            const imageTypeIds = exclusionImageTypes.data.map(
                (item) => item.imageTypeId
            );
            return typesList.imageTypes.data.filter((item) =>
                imageTypeIds.includes(item.id)
            );
        }
        const imageTypeIds = typesList.assetImageTypes.data
            .filter((item) => assetTypeIds.includes(item.assetTypeId))
            .map((item) => item.imageTypeId);

        const next = typesList.imageTypes.data.filter((item) =>
            imageTypeIds.includes(item.id)
        );

        if (next.length === 0) {
            const unknown = typesList.imageTypes.data.find(
                (item) => item.id === 1
            );
            next.push(unknown);
        }
        return next;
    }, [assetTypeIds, exclusionReasonTypeId, typesList]);
    return imageTypes;
};
