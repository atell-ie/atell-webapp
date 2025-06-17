import { useMemo } from "react";
import { useSelector } from "react-redux";

export default (auditId) => {
    const { audits } = useSelector((state) => state);

    const audit = useMemo(() => {
        if (!auditId) return;
        const index = audits.byId[auditId];
        if (index === undefined || index == null) return;

        return audits.data[index];
    }, [audits]);

    return audit;
};
