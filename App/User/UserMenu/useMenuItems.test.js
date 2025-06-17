import useMenuItems from "./useMenuItems";
import Router from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import menuItems from "@/jest-test-data/MenuItems/MenuItems";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe("Hooks - useMenuItems ", () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ auditId: "10" });

    test("Should display all the 5 menu Items ", () => {
        const title = "audits/assets/list";
        const expectedData = JSON.stringify(menuItems);
        const { result } = renderHook(() => useMenuItems(title));
        const resultData = JSON.stringify(result.current);
        expect(expectedData).toBe(resultData);
    });

    test("Should display 3 menu Items", () => {
        const title = "audits/assets/details";
        const expectedData = menuItems.filter(
            (val) => val.grantedPerms === "all"
        );
        const { result } = renderHook(() => useMenuItems(title));
        const resultData = JSON.stringify(result.current);
        expect(JSON.stringify(expectedData)).toBe(resultData);
    });
});
