import auditAssets from "@/jest-test-data/helpers/auditAssets";
import list from "./list";

describe("Queries", () => {
    test("Get Item For Id ", () => {
        const { getItemForId } = list;

        //Return if the id is present in list
        expect(getItemForId(auditAssets, 59485)).toEqual(auditAssets.data[2]);
        //Return empty object  if the  id is not present
        expect(getItemForId(auditAssets, 1)).toEqual({});
    });

    test("Get Reducer", () => {
        const { getReducer } = list;
        const storeDataStructure = {
            byId: {},
            data: [],
            item: null,
        };
        const data = [
            {
                id: 3,
                name: "Admin",
            },
            {
                id: 1,
                name: "Auditor",
            },
            {
                id: 2,
                name: "Controller",
            },
        ];
        const expectedResult = {
            byId: { 1: 1, 2: 2, 3: 0 },
            data: [
                { id: 3, name: "Admin" },
                { id: 1, name: "Auditor" },
                { id: 2, name: "Controller" },
            ],
            item: null,
        };

        // Data to be constructed as expected result.
        expect(getReducer(storeDataStructure, data)).toEqual(expectedResult);

        // Empty data to return strucutre
        expect(getReducer(storeDataStructure, [])).toEqual(storeDataStructure);
    });

    test("Merge Item for Reducer", () => {
        const { mergeReducer, getItemForId } = list;
        const lists = {
            byId: {},
            data: [],
            item: null,
        };
        const newData = [
            {
                createdBy: 255,
                createdDate: "2022-05-10T16:02:23.972Z",
                make: 60,
                auditImages: [],
                notes: [],
                type: 6,
                id: "98a0c196-c96c-4057-a9ec-86eccee6bbec",
                uuid: "98a0c196-c96c-4057-a9ec-86eccee6bbec",
            },
        ];
        const result = mergeReducer(lists, newData);

        /** Adding the item for the reducer */
        expect(result.data.length).toEqual(1);

        /** Check if the added data is present in the list  */
        expect(getItemForId(result, newData[0].id)).toEqual(newData[0]);

        /** Merging the data with the updated item */
        newData[0].make = 61;
        const updatedResult = getItemForId(result, newData[0].id);
        expect(updatedResult.make).toEqual(61);
    });
});
