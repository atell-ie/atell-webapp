import actions from "./actions";

describe("tasks actions", () => {
    test("itemClear", () => {
        const actionReturnValue = actions.create.itemClear();
        expect(actionReturnValue.type).toEqual("TASK_ITEM_CLEAR");
    });

    test("itemSet", () => {
        const task = { test: "test" };
        const actionReturnValue = actions.create.itemSet(task);

        expect(actionReturnValue.type).toEqual("TASK_ITEM_SET");
        expect(actionReturnValue.payload).toMatchObject({ task });
    });

    test("itemUpdate", () => {
        const task = { test: "test" };
        const actionReturnValue = actions.create.itemUpdate(task);

        expect(actionReturnValue.type).toEqual("TASK_ITEM_UPDATE");
        expect(actionReturnValue.payload).toMatchObject({ task });
    });

    test("getRequest", () => {
        const actionReturnValue = actions.create.getRequest();

        expect(actionReturnValue.type).toEqual("TASKS_REQUEST");
    });

    test("getRequestSuccess", () => {
        const tasks = { test: "test" };
        const actionReturnValue = actions.create.getRequestSuccess(tasks);

        expect(actionReturnValue.type).toEqual("TASKS_REQUEST_SUCCESS");
        expect(actionReturnValue.payload).toMatchObject({ tasks });
    });

    test("getRequestFailure", () => {
        const error = { test: "test" };
        const actionReturnValue = actions.create.getRequestFailure(error);

        expect(actionReturnValue.type).toEqual("TASKS_REQUEST_FAILURE");
        expect(actionReturnValue.error).toMatchObject(error);
    });
});
