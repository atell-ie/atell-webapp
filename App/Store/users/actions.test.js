import actions from "./actions";

describe("audits actions", () => {
    test("itemClear", () => {
        const actionReturnValue = actions.create.itemClear();

        expect(actionReturnValue.type).toEqual("AUDIT_ITEM_CLEAR");
    });

    test("itemSet", () => {
        const audit = { test: "test" };
        const actionReturnValue = actions.create.itemSet(audit);

        expect(actionReturnValue.type).toEqual("AUDIT_ITEM_SET");
        expect(actionReturnValue.payload).toMatchObject({ audit });
    });

    test("itemSelectRequest", () => {
        const query = "test";
        const actionReturnValue = actions.create.itemSelectRequest(query);

        expect(actionReturnValue.type).toEqual("AUDIT_ITEM_SELECT_REQUEST");
        expect(actionReturnValue.payload).toMatchObject({ query });
    });
    test("itemSelectSuccess", () => {
        const audit = { test: "test" };
        const actionReturnValue = actions.create.itemSelectSuccess(audit);

        expect(actionReturnValue.type).toEqual("AUDIT_ITEM_SELECT_SUCCESS");
        expect(actionReturnValue.payload).toMatchObject({ audit });
    });
    test("itemSelectFailure", () => {
        const error = { test: "test" };
        const actionReturnValue = actions.create.itemSelectFailure(error);

        expect(actionReturnValue.type).toEqual("AUDIT_ITEM_SELECT_FAILURE");
        expect(actionReturnValue.error).toMatchObject(error);
    });

    test("selectRequest", () => {
        const query = "test";
        const actionReturnValue = actions.create.selectRequest(query);

        expect(actionReturnValue.type).toEqual("AUDITS_SELECT_REQUEST");
        expect(actionReturnValue.payload).toMatchObject({ query });
    });

    test("selectSuccess", () => {
        const audits = { test: "test" };
        const actionReturnValue = actions.create.selectSuccess(audits);

        expect(actionReturnValue.type).toEqual("AUDITS_SELECT_SUCCESS");
        expect(actionReturnValue.payload).toMatchObject({ audits });
    });

    test("selectFailure", () => {
        const error = { test: "test" };
        const actionReturnValue = actions.create.selectFailure(error);

        expect(actionReturnValue.type).toEqual("AUDITS_SELECT_FAILURE");
        expect(actionReturnValue.error).toMatchObject(error);
    });

    test("writeRequest", () => {
        const audits = { test: "test" };
        const actionReturnValue = actions.create.writeRequest(audits);

        expect(actionReturnValue.type).toEqual("AUDITS_WRITE_REQUEST");
        expect(actionReturnValue.payload).toMatchObject({ audits });
    });

    test("writeSuccess", () => {
        const audits = { test: "test" };
        const actionReturnValue = actions.create.writeSuccess(audits);

        expect(actionReturnValue.type).toEqual("AUDITS_WRITE_SUCCESS");
        expect(actionReturnValue.payload).toMatchObject({ audits });
    });

    test("writeFailure", () => {
        const error = { test: "test" };
        const actionReturnValue = actions.create.writeFailure(error);

        expect(actionReturnValue.type).toEqual("AUDITS_WRITE_FAILURE");
        expect(actionReturnValue.error).toMatchObject(error);
    });
});
