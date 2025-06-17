import { useMemo } from "react";
import { useSelector } from "react-redux";

export default (typeId) => {
    const { typesList } = useSelector((state) => state);
    const { makes } = typesList;
    const make = useMemo(() => {
        if (!typeId) return;
        const index = makes.byId[typeId];
        if (index === undefined || index === null) return;

        return makes.data[index];
    }, [makes]);

    return make;
};
