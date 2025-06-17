import React from "react";
import * as redux from "react-redux";
import { customRender, waitFor, fireEvent } from "@/jest-test/test-utils";
import Toaster from "./old__Toaster";

const state = { toast: [] };

describe("Toaster", () => {
    test("Check if modal renderred", async () => {
        const toastMsg = {
            message: "Toast test message",
            style: "info",
            uuid: "b2adea35-b407-432e-8f87-b5b598f25bd1"
        };

        state.toast.push(toastMsg);

        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { getByText, queryByText, getByTitle } = customRender(
            <Toaster />
        );

        // check if inner component and title are present
        await waitFor(() => {
            const testMessage = getByText("Toast test message");
            expect(testMessage).toBeInTheDocument();
        });

        // check if on Close toaster dissapears
        await waitFor(() => {
            const closeBtn = getByTitle("Close");
            fireEvent.click(closeBtn);
        });

        await waitFor(() => {
            expect(queryByText("Toast test message")).toBeNull();
        });
    });
});
