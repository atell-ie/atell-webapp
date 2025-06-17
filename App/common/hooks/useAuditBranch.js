import React, { useMemo } from "react";
/**
 * Use Audit Branch Hook
 */

export default (auditAssignment: any) => {
    const branch = useMemo(() => {
        if (auditAssignment) {
            const { branch } = auditAssignment.auditLocation.audit;
            return branch.name;
        }
        return "";
    }, [auditAssignment]);

    return branch;
};
