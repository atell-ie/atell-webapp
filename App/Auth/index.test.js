import React from "react";
import { useNavigate } from "react-router-dom";
import { customRender, waitFor } from "@/jest-test/test-utils";
import * as redux from "react-redux";
import { auth } from "@/jest-test-data/Auth/auth";
import Auth from "./index.js";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => jest.fn(),
    useNavigate: () => mockedUsedNavigate,
}));

describe("Auth", () => {
    const state = { auth };

    jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
        callback(state)
    );

    it("Show Re authentication modal when session is expired", async () => {
        const { getByText } = customRender(<Auth />);
        await waitFor(() => {
            const email = auth.account.email;
            expect(getByText(email)).toBeInTheDocument();
            expect(
                getByText(
                    "Your session has expired. Please re-enter your password to continue."
                )
            ).toBeInTheDocument();
        });
    });

    it("If no access token go to login ", async () => {
        auth.account = {};
        auth.accessToken = "";
        const navigate = useNavigate();
        customRender(<Auth />);

        await waitFor(() => {
            expect(navigate).toBeCalledWith("/login");
        });
    });
});
