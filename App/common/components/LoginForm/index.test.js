import React from "react";
import LoginForm from "./index";

import { customRender, waitFor, fireEvent } from "@/jest-test/test-utils";

describe("LoginForm", () => {
    test("test form presence", async () => {
        const { getAllByText, container } = customRender(<LoginForm />);

        await waitFor(() => {
            expect(getAllByText(/Sign In/i)[0]).toBeInTheDocument();
            expect(container).toMatchSnapshot();
        });
    });

    test("test login button enable/disable state", async () => {
        const { getByTestId } = customRender(<LoginForm />);

        await waitFor(() => {
            const emailInput = getByTestId("user-email");
            const passwordInput = getByTestId("user-password");
            const loginSubmit = getByTestId("login-submit");
            expect(loginSubmit).toHaveClass("Mui-disabled");

            fireEvent.change(emailInput, {
                target: { value: "alex@checkventory.com" },
            });
            fireEvent.change(passwordInput, {
                target: { value: "TestPassword" },
            });

            expect(loginSubmit).not.toHaveClass("Mui-disabled");
        });
    });

    //TODO: test error if logins credentials are not correct
});
