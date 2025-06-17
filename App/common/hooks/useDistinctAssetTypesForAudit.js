import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import db from "../lib/database";
import helpers from "../lib/helpers";
import { get } from "idb-keyval";

/**
 * Use Distinct Asset-types for Current Audit Hook
 */
export default () => {
    const { auditLocations, audits, typesList } = useSelector((state) => state);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (auditLocations.data.length && audits.item)
                try {
                    const forAudit = auditLocations.data.filter(
                        (item) => item.audit.id === audits.item.id
                    );

                    const auditAssets = await get(db.types.auditAsset);
                    const filteredAssets = db.queries.distinctAssetTypes(
                        auditAssets,
                        forAudit
                    );

                    const next = filteredAssets.map(({ assetCore }) => {
                        return helpers.list.getItemForId(
                            typesList.assetTypes,
                            assetCore.type
                        );
                    });
                    setData(next);
                } catch (error) {
                    console.log(error);
                    Sentry.captureException(error);
                }
        };
        fetchData();
    }, [auditLocations, audits, typesList]);

    return data;
};
