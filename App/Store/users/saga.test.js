import { select, write } from "./saga";
import customRunSaga from "@/jest-test/customRunSaga";
import { actionTypes } from "./actions";
import auditsRedux from "@/jest-test-data/Store/audits/auditsRedux.js";

import idb from "idb-keyval";

jest.mock("idb-keyval", () => ({
    get: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
}));

describe("audits saga", () => {
    const auditsData = auditsRedux.data[0];

    test("selectSuccess", async () => {
        const action = {
            type: actionTypes.AUDITS_SELECT_SUCCESS,
        };
        const dispatched = await customRunSaga(select, action);
        idb.get.mockResolvedValue([auditsData]);

        expect(dispatched[0].type).toEqual(actionTypes.AUDITS_SELECT_SUCCESS);
    });

    test("selectFailure", async () => {
        idb.get.mockRejectedValue("Mocked error");

        const dispatched = await customRunSaga(select, auditsData);

        expect(dispatched[0].type).toEqual(actionTypes.AUDITS_SELECT_FAILURE);
        expect(dispatched[0].error).toEqual("Mocked error");
    });

    test("writeSuccess", async () => {
        const action = {
            type: actionTypes.AUDITS_WRITE_SUCCESS,
            payload: {
                audits: [auditsData],
            },
        };
        idb.set.mockResolvedValue([auditsData]);

        const dispatched = await customRunSaga(write, action);
        expect(dispatched[0].type).toEqual(actionTypes.AUDITS_WRITE_SUCCESS);
        expect(dispatched[0].payload).toEqual({
            audits: [auditsData],
        });
    });

    test("writeFailure", async () => {
        idb.set.mockRejectedValue("Mocked failure");
        const action = {
            type: actionTypes.AUDITS_WRITE_FAILURE,
            payload: {
                audits: [auditsData],
            },
        };

        const dispatched = await customRunSaga(write, action);
        expect(dispatched[0].type).toEqual(actionTypes.AUDITS_WRITE_FAILURE);
        expect(dispatched[0].error).toEqual("Mocked failure");
    });
});
