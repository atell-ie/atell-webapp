import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import helpers from "../lib/helpers";
import db from "../lib/database";
import { get } from "idb-keyval";

/**
 * Use Distinct Makes for Current Audit Hook
 */
export default (auditId) => {
    const { auditLocations, typesList } = useSelector((state) => state);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (auditLocations.data.length && auditId)
                try {
                    const forAudit = auditLocations.data.filter(
                        (item) => item.audit.id === auditId
                    );

                    let auditAssets = await get(db.types.auditAsset);
                    const filteredAssets = db.queries.distinctAssetMakes(
                        auditAssets,
                        forAudit
                    );

                    const next = filteredAssets.map(({ assetCore }) => {
                        return helpers.list.getItemForId(
                            typesList.makes,
                            assetCore.make
                        );
                    });
                    setData(next);
                } catch (error) {
                    console.log(error);
                    Sentry.captureException(error);
                }
        };

        fetchData();
    }, [auditLocations, auditId, typesList]);

    return data;
};
