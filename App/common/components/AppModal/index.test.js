import React from "react";
import { customRender, waitFor, fireEvent } from "@/jest-test/test-utils";
import AppModal from "./index";

describe("AppModal index", () => {
    test("Check if modal renderred", async () => {
        const onClose = jest.fn();

        const { getByText, findByRole } = customRender(
            <AppModal
                isVisible={true}
                onClose={onClose}
                title={"AppModal Test Title"}
            >
                <div>Testing AppModal</div>
            </AppModal>
        );

        // check if inner component and title are present
        await waitFor(() => {
            const childComponent = getByText("Testing AppModal");
            const modalTitle = getByText("AppModal Test Title");
            expect(childComponent).toBeInTheDocument();
            expect(modalTitle).toBeInTheDocument();
        });

        // test close button
        const closeBtn = await findByRole("button");
        fireEvent.click(closeBtn);

        await waitFor(() => {
            expect(onClose).toHaveBeenCalled();
        });
    });
});
