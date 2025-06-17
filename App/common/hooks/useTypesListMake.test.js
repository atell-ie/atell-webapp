import React from "react";
import * as redux from "react-redux";
import useTypesListMake from "./useTypesListMake";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useTypesListMake", () => {
    test("typeId passed", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );
        const typeId = 6;

        const { result } = renderHook(() => useTypesListMake(typeId));

        const expectedOutput = { id: 6, name: "pirelli-tecnorib" };

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedOutput));
    });

    test("NO typeId passed", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );
        const typeId = undefined;

        const { result } = renderHook(() => useTypesListMake(typeId));
        const output = result.current;
        expect(output).toBe(undefined);
    });
});
