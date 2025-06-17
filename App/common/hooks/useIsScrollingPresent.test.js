import React from "react";
import { customRender } from "@/jest-test/test-utils";
import useIsScrollingPresent from "./useIsScrollingPresent";
import { renderHook } from "@testing-library/react-hooks";

describe("hooks/useIsScrollingPresent", () => {
    test("useIsScrollingPresent NO scrolling", async () => {
        const { getByText } = customRender(
            <div
                id="screen-outer-wrp"
                style={{ width: "200px", height: "300px" }}
            >
                <div id="test-element" style={{ height: "100%" }}>
                    Short text
                </div>
            </div>
        );

        const { result } = renderHook(() =>
            useIsScrollingPresent("test-element")
        );

        expect(result.current).toBe(false);
    });

    // TODO: jest doesn't render layout,
    // so height always 0, need to find a different way
});
