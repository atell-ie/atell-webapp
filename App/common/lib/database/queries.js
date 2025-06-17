/**
 * Filtering Excluding Locations
 */
const excludeAssetFilter = (results, locIds) => {
    return results.filter((item) => {
        if (
            locIds.includes(item.auditLocation.id) &&
            item.isExpected &&
            item.isMandatory &&
            !item.isAssigned
        )
            return true;
        return false;
    });
};
/**
 * Filter asset
 */

const assetFilter = (results, locIds) => {
    return results.filter((item) => {
        if (locIds.includes(item.auditLocation.id) && item.isExpected)
            return true;

        return false;
    });
};
/***
 * Search Asset Filters
 * Searches the entire database of auditAsset (as per previous logic)
 * Future Implementation : To filter out based on the  org.
 * Current implementaion: Shows asset on the current device
 * -> Includes the  asset  found on other audit.
 * -> Includes asset from other orgs
 */
const searchAssetFilter = (search, results) => {
    const res = results.filter((item) =>
        //TODO: Can use db to store assetCore values that we can search against?
        Object.values(item.assetCore).join(" ").toLowerCase().includes(search)
    );

    return res;
};

/****
 *
 * Wrapper function for auditAsset
 */
const forAuditAssets = (locIds, requestType, search, results) => {
    if (requestType === undefined) {
        return assetFilter(results, locIds);
    } else if (requestType === "exclude") {
        return excludeAssetFilter(results, locIds);
    }
};

/**
 * Distinct Asset Makes
 */
const distinctAssetMakes = (auditAssets: Array<any>, locations: Array<any>) => {
    const uniqueMake = {};
    const locIds = locations.map((item) => item.id);
    const filteredAudits = auditAssets.reduce((acc, item) => {
        let hasUniqueMake = false;
        if (!uniqueMake[item.assetCore.make]) {
            uniqueMake[item.assetCore.make] = item.assetCore.make;
            hasUniqueMake = true;
        }

        if (locIds.includes(item.auditLocation.id) && hasUniqueMake) {
            acc.push(item);
            return acc;
        }
        return acc;
    }, []);

    return filteredAudits;
};

/**
 * Distinct Asset Types
 */

const distinctAssetTypes = (auditAssets: Array<any>, locations: Array<any>) => {
    const uniqueType = {};
    const locIds = locations.map((item) => item.id);

    const filteredAudits = auditAssets.reduce((acc, item) => {
        let hasUniqueType = false;
        if (!uniqueType[item.assetCore.type]) {
            uniqueType[item.assetCore.type] = item.assetCore.type;
            hasUniqueType = true;
        }

        if (locIds.includes(item.auditLocation.id) && hasUniqueType) {
            acc.push(item);
            return acc;
        }
        return acc;
    }, []);

    return filteredAudits;
};
/**
 * For Audit: Extracting auditId from the listt
 */
const forAudit = (auditId, list) => {
    if (list.length > 0)
        return list.filter((item) => item.audit.id === auditId);
    else return [];
};
/**
 * For Audit assignmentIds:  Extracting auditAssignment present in assetAuditor table
 */
const forAuditAssignments = (assignmentIds, assetAuditor) => {
    if (assetAuditor.length > 0)
        return assetAuditor.filter((item) =>
            assignmentIds.includes(item.auditAssignment.id)
        );
    else return [];
};
/**
 * For Audit Location Audit
 */
const forAuditLocationAudit = (auditId, auditLocations) => {
    if (auditLocations.length > 0)
        return auditLocations.filter(
            (item) => item.auditLocation.audit.id === auditId
        );
    else return [];
};
/**
 * For Audit Locations IDs
 */
const forAuditLocationIds = (locationIds, auditAssets) => {
    if (auditAssets.length > 0)
        return auditAssets.filter((item) =>
            locationIds.includes(item.auditLocation.id)
        );
    else return [];
};

export default {
    assetFilter,
    distinctAssetMakes,
    distinctAssetTypes,
    forAudit,
    forAuditAssignments,
    forAuditAssets,
    forAuditLocationAudit,
    forAuditLocationIds,
    excludeAssetFilter,
    searchAssetFilter,
};
