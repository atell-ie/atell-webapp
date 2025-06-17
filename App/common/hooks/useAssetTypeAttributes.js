import { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Use Asset-type Attributes Hook
 */
export default (typeId: number) => {
    const { typesList } = useSelector((state) => state);

    const next = useMemo(() => {
        if (typeId) {
            const { attributes, typeAttributes } = typesList;
            const attributeIds = typeAttributes.data
                .filter((item) => item.typeId === typeId)
                .map((item) => item.attributeId);
            return attributes.data
                .filter(({ id }) => attributeIds.includes(id))
                .reduce(
                    (aggregate, item) => ({
                        ...aggregate,
                        [item.id]: item.name,
                    }),
                    {}
                );
        }
        return {};
    }, [typeId, typesList]);

    return next;
};
