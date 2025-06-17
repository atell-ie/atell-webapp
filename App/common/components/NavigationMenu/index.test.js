import React from "react";
import Router from "react-router-dom";
import { customRender, fireEvent, waitFor } from "@/jest-test/test-utils";
import { useNavigate } from "react-router-dom";
import menuItems from "@/jest-test-data/MenuItems/MenuItems";
import Drawer from "./index.js";

const mockUseLocationValue = {
    pathname: "/auth/audits/list",
    search: "",
    hash: "",
    state: null,
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    }),
}));

describe("Drawer", () => {
    const onClose = jest.fn();
    const open = true;
    const items = menuItems;
    const testProps = { onClose, open, items };
    jest.spyOn(Router, "useParams").mockReturnValue({ auditId: "10" });

    test("On Click of Audits", async () => {
        const navigate = useNavigate();
        const { getByText } = customRender(<Drawer {...testProps} />);
        await waitFor(() => {
            const text = getByText("Audits");
            fireEvent.click(text);
            expect(navigate).toHaveBeenCalledWith(`/auth/audits/list`);
        });
    });
    test("On Click of Exlcude Remaining", async () => {
        mockUseLocationValue.pathname = "auth/audits/10/details";
        const navigate = useNavigate();
        const { getByText } = customRender(<Drawer {...testProps} />);
        await waitFor(() => {
            const text = getByText("Exclude remaining");
            fireEvent.click(text);
            expect(navigate).toHaveBeenCalledWith(
                "/auth/audits/10/assets/exclude-remaining"
            );
        });
    });
    test("On Click of Submit Audit", async () => {
        mockUseLocationValue.pathname = "auth/audits/10/details";
        const navigate = useNavigate();
        const { getByText } = customRender(<Drawer {...testProps} />);
        await waitFor(() => {
            const text = getByText("Submit audit");
            fireEvent.click(text);
            expect(navigate).toHaveBeenCalledWith("/auth/audits/10/submit");
        });
    });
    test("On Click of Settings", async () => {
        const navigate = useNavigate();
        const { getByText } = customRender(<Drawer {...testProps} />);
        await waitFor(() => {
            const text = getByText("Settings");
            fireEvent.click(text);
            expect(navigate).toHaveBeenCalledWith(`/auth/settings`);
        });
    });
    test("On Click of Logout", async () => {
        const navigate = useNavigate();
        const { getByText } = customRender(<Drawer {...testProps} />);
        await waitFor(() => {
            const text = getByText("Logout");
            fireEvent.click(text);
            expect(navigate).toHaveBeenCalledWith(`/login`);
        });
    });
});
