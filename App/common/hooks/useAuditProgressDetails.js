import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import helpers from "../lib/helpers";
import { db } from "../lib";
import { get } from "idb-keyval";

const defaultProgress = {
    alt: 0,
    assigned: 0,
    isComplete: false,
    required: 0,
};

// dataSource : "db" || "store"
export default (dataSource: string, auditId: number) => {
    const { audits, altAssets, auditAssets } = useSelector((state) => state);
    const [progress, setProgress] = useState(defaultProgress);

    let auditAltAssets = altAssets.data;
    let requiredAssets = auditAssets.data;

    useEffect(() => {
        const processProgress = async () => {
            let audit = helpers.list.getItemForId(audits, auditId);
            // depending on the dataSource we load data
            // from db or from the redux-store

            if (dataSource === "db") {
                auditAltAssets = (await get(db.types.altAsset)) || [];
                requiredAssets = (await get(db.types.auditAsset)) || [];
            }

            if (Object.keys(audit).length > 0) {
                auditAltAssets = auditAltAssets.filter(
                    (item) => item.audit.id === parseInt(auditId)
                );
                /**  Filter out
                 * 1. Mandatory assets  and checked assets
                 * 2. Assigned items false
                 * Should  consider only mandatory assets as we only want them in the list
                 */
                const auditedAssets = requiredAssets.filter(
                    (item) =>
                        item.auditLocation.audit.id === parseInt(auditId) &&
                        item.isAssigned
                );

                requiredAssets = requiredAssets.filter(
                    (item) =>
                        item.auditLocation.audit.id === parseInt(auditId) &&
                        item.isMandatory &&
                        item.isExpected &&
                        !item.isAssigned
                );

                /**  Filter out
                 * 1. Mandatory assets  and Expected assets
                 * 2. Assigned items false
                 * Should  consider only mandatory assets as we only want them in the list
                 */

                const assignedAssets = requiredAssets.filter(
                    (i) =>
                        i.auditLocation.audit.id === parseInt(auditId) &&
                        i.isAssigned &&
                        i.isMandatory &&
                        i.isExpected
                );

                setProgress({
                    alt: auditAltAssets.length,
                    assigned: auditedAssets.length,
                    isComplete:
                        requiredAssets.length - assignedAssets.length === 0,
                    required: requiredAssets.length,
                });
            }
        };
        processProgress();
    }, [auditId, altAssets, auditAssets]);

    return progress;
};
