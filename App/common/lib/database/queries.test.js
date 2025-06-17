import auditAsset from "@/jest-test-data/queries/forAuditLocationIds/auditAsset";
import auditAssignments from "@/jest-test-data/queries/forAuditLocationAudit/auditAssignments";
import assetAuditor from "@/jest-test-data/queries/forAuditAssignments/assetAuditor";
import altAssets from "@/jest-test-data/queries/forAudit/altAssets";
import forAuditAssetData from "@/jest-test-data/queries/forAuditAssets/forAuditAssetData";
import searchResults from "@/jest-test-data/queries/forSearchAsset/forSearchAssetData";
import distinctAssetMakeAuditAsset from "@/jest-test-data/queries/distinctAssetMakes/distinctAssetMakeAuditAsset";
import distinctAssetMakeLocations from "@/jest-test-data/queries/distinctAssetMakes/distinctAssetMakeLocations";
import queries from "./queries";

describe("Queries", () => {
    test("For Audit Assets", () => {
        const { forAuditAssets } = queries;

        /** Exclude Asset Filter for Audit Assets */
        const locIds = [50];
        const resultForExcludeAssetFilter = forAuditAssets(
            locIds,
            "exclude",
            "",
            forAuditAssetData
        );

        const expResultForExcludeAssetFilter = [forAuditAssetData[2]];
        expect(resultForExcludeAssetFilter).toEqual(
            expResultForExcludeAssetFilter
        );

        /** Asset Filter for Audit Assets */
        const resultForAssetFilter = forAuditAssets(
            [10],
            undefined,
            undefined,
            forAuditAssetData
        );

        const expectedResultForAssetFilter = [forAuditAssetData[0]];
        expect(resultForAssetFilter).toEqual(expectedResultForAssetFilter);
    });

    test("Exclude  Asset Filter", () => {
        const { excludeAssetFilter } = queries;
        const locIds = [50];

        /** Check location Ids  with  auditAsset return matching values */
        const resultForData = excludeAssetFilter(forAuditAssetData, locIds);
        const expectedResultForData = [forAuditAssetData[2]];
        expect(resultForData).toEqual(expectedResultForData);

        /** Expect [] if location is not present in the data */
        const expectedResultDataEmpty = excludeAssetFilter(forAuditAssetData, [
            11,
        ]);

        expect(expectedResultDataEmpty).toEqual([]);
    });

    test("Asset Filter", () => {
        const { assetFilter } = queries;
        const locIds = [10];

        /** Check location Ids  with  auditAsset return matching values */
        const resultForData = assetFilter(forAuditAssetData, locIds);
        const expectedResultForData = [forAuditAssetData[0]];
        expect(resultForData).toEqual(expectedResultForData);

        /** Expect [] if the location is not present in auditAsset */
        const assetDataEmpty = assetFilter(forAuditAssetData, [11]);
        expect(assetDataEmpty).toEqual([]);
    });

    test("Search Asset Filter", () => {
        const { searchAssetFilter } = queries;
        const searchString = "U5YH6".toLowerCase();

        /** value found */
        const resultForData = searchAssetFilter(
            searchString,
            searchResults.results
        );

        expect(resultForData).toEqual(searchResults.results);

        /** not found value  */
        const searchDataEmpty = searchAssetFilter(
            "XXXX",
            searchResults.results
        );
        expect(searchDataEmpty).toEqual([]);
    });

    test("For Audit", () => {
        const { forAudit } = queries;
        const auditId = 10;

        /** Check  auditId with  altAsset return matching values */
        const resultForData = forAudit(auditId, altAssets);
        const expectedResultForData = [altAssets[0]];
        expect(resultForData).toEqual(expectedResultForData);

        /** Expect [] if searching for empty database  */
        const resultToBeEmpty = forAudit(auditId, []);
        expect(resultToBeEmpty).toEqual([]);

        /** Expect [] if current audit Id  is not  matched with alt Assets data  */
        const currentAuditDataNotPresent = forAudit(199, altAssets);
        expect(currentAuditDataNotPresent).toEqual([]);
    });

    test("For Audit Assignments", () => {
        const { forAuditAssignments } = queries;
        const assignmentIds = [699, 700];

        /** Check  assignmentIds with  assetAuditor return matching values */
        const resultForData = forAuditAssignments(assignmentIds, assetAuditor);
        const expectedResultForData = [assetAuditor[0], assetAuditor[1]];
        expect(resultForData).toEqual(expectedResultForData);

        /** Expect [] if assignment Id's is compated with no assetAuditor */
        const resultToBeEmpty = forAuditAssignments(assignmentIds, []);
        expect(resultToBeEmpty).toEqual([]);
    });

    test("For Audit Location Audit", () => {
        const { forAuditLocationAudit } = queries;
        const auditId = 10;

        /** Check  auditId with  auditAssignment return matching values */
        const resultForData = forAuditLocationAudit(auditId, auditAssignments);
        const expectedResultForData = [
            auditAssignments[0],
            auditAssignments[1],
        ];
        expect(resultForData).toEqual(expectedResultForData);

        /** Expect [] when comparing auditId with empty auditAssignment  */
        const resultToBeEmpty = forAuditLocationAudit(auditId, []);
        const expectedResultEmpty = [];
        expect(resultToBeEmpty).toEqual(expectedResultEmpty);
    });

    test("For Audit Location Ids", () => {
        const locIds = [10, 20, 30, 40];
        const { forAuditLocationIds } = queries;

        /** Check Location Id's for auditAsset should be returned */
        const resultForData = forAuditLocationIds(locIds, auditAsset);
        const expectedResultForData = [auditAsset[0]];
        expect(resultForData).toEqual(expectedResultForData);

        /** Expect No data to be returned  */
        const resultToBeEmpty = forAuditLocationIds([], auditAsset);
        expect(resultToBeEmpty).toEqual([]);
    });

    test("Distinct Asset Make", () => {
        const { distinctAssetMakes } = queries;
        /** Check matching  locations for auditAsset and return  object matches  with distinct make  */
        const resultForData = distinctAssetMakes(
            distinctAssetMakeAuditAsset,
            distinctAssetMakeLocations
        );
        const expctedResultForMakes = [
            distinctAssetMakeAuditAsset[0],
            distinctAssetMakeAuditAsset[3],
        ];
        expect(resultForData).toEqual(expctedResultForMakes);
    });
    test("Distinct Asset Type", () => {
        const { distinctAssetTypes } = queries;
        /** Check matching  locatins for auditAsset and return  object matches  with distinct type  */
        const resultForData = distinctAssetTypes(
            distinctAssetMakeAuditAsset,
            distinctAssetMakeLocations
        );
        const expctedResultForMakes = [distinctAssetMakeAuditAsset[0]];
        expect(resultForData).toEqual(expctedResultForMakes);
    });
});
