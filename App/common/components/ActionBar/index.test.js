import React from "react";
import { customRender, waitFor } from "@/jest-test/test-utils";
import ActionBar from ".";

describe("ActionBar", () => {
    test("default behaviour ", async () => {
        const { container, getByText } = customRender(
            <ActionBar>
                <div>test</div>
            </ActionBar>
        );

        await waitFor(() => {
            const startAudit = "test";
            expect(getByText(startAudit)).toBeInTheDocument();
            expect(container).toMatchSnapshot();
        });
    });
});
