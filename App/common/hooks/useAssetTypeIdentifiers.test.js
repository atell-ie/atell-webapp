import * as redux from "react-redux";
import useAssetTypeIdentifiers from "./useAssetTypeIdentifiers";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useAssetTypeIdentifiers", () => {
    test("typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = {
            identifier1: "chassis number",
            identifier2: "registration number",
        };

        const typeId = 6;
        const { result } = renderHook(() => useAssetTypeIdentifiers(typeId));

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAssetTypeIdentifiers());
        expect(JSON.stringify(result.current)).toBe(JSON.stringify({}));
    });
});
