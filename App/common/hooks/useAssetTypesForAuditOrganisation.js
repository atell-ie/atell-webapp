import { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Use Asset-types for Current Audit Organisation Hook
 */
export default () => {
    const { audits, typesList } = useSelector((state) => state);

    const next = useMemo(() => {
        if (audits.item && audits.item.organisation) {
            const { assetTypes, organisationAssetTypes } = typesList;
            const assetTypeIds = organisationAssetTypes.data
                .filter(
                    (item) =>
                        item.organisationId === audits.item.organisation.id
                )
                .map((item) => item.assetTypeId);
            return assetTypes.data.filter(({ id }) =>
                assetTypeIds.includes(id)
            );
        }
        return typesList.assetTypes.data;
    }, [audits, typesList]);

    return next;
};
