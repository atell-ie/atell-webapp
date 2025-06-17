import { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Use Asset-type Identifiers Hook
 */
export default (typeId: number) => {
    const { typesList } = useSelector((state) => state);

    const next = useMemo(() => {
        if (typeId) {
            const { identifiers, typeIdentifiers } = typesList;
            const identiferIds = typeIdentifiers.data
                .filter((item) => item.typeId === typeId)
                .map((item) => item.identifierId);

            return identifiers.data
                .filter(({ id }) => identiferIds.includes(id))
                .reduce(
                    (aggregate, item) => ({
                        ...aggregate,
                        [`identifier${item.id}`]: item.name,
                    }),
                    {}
                );
        }
        return {};
    }, [typeId, typesList]);

    return next;
};
