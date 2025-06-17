import React, { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Use Audit Assignment Hook
 */
export default (auditLocationId: number) => {
    const { auditAssignments } = useSelector((state) => state);

    const next = useMemo(() => {
        if (auditLocationId) {
            return auditAssignments.data.find(
                (item) => item.auditLocation.id === auditLocationId
            );
        }
    }, [auditAssignments, auditLocationId]);

    return next || null;
};
