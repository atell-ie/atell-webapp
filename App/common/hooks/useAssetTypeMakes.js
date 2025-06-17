import { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Use Asset-type Makes Hook
 */
export default (typeId: number) => {
    const { typesList } = useSelector((state) => state);

    const next = useMemo(() => {
        if (typeId) {
            const { makes, makeTypes } = typesList;
            const makeIds = makeTypes.data
                .filter((item) => item.typeId === typeId)
                .map((item) => item.makeId);
            return makes.data.filter(({ id }) => makeIds.includes(id));
        }
        return [];
    }, [typeId, typesList]);

    return next;
};
