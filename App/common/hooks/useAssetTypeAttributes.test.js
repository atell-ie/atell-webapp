import * as redux from "react-redux";
import useAssetTypeAttributes from "./useAssetTypeAttributes";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useAssetTypeAttributes", () => {
    test("typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = {
            1: "model",
            2: "model variant",
            3: "colour",
            4: "condition",
            5: "odometer",
            6: "age",
        };

        const typeId = 6;
        const { result } = renderHook(() => useAssetTypeAttributes(typeId));

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAssetTypeAttributes());
        expect(JSON.stringify(result.current)).toBe(JSON.stringify({}));
    });
});
