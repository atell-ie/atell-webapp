import menuUtils from "./menuUtils";
describe("menuUtils", () => {
    test("Contains Number", () => {
        let pathname = "auth/audits/735/details";
        expect(menuUtils.containsNumbers(pathname)).toBe(true);
        pathname = "auth/audits/list";
        expect(menuUtils.containsNumbers(pathname)).toBe(false);
        pathname = "auth/audits/735/assets/64279/details";
        expect(menuUtils.containsNumbers(pathname)).toBe(true);
        pathname = "";
        expect(menuUtils.containsNumbers(pathname)).toBe(false);
    });
    test("Screen title", () => {
        let pathname = "auth/audits/735/details";
        expect(menuUtils.screenTitle(pathname)).toEqual("audits/details");
        pathname = "auth/audits/735/assets/exclude-remaining";
        expect(menuUtils.screenTitle(pathname)).toEqual(
            "audits/assets/exclude-remaining"
        );
        pathname = "auth/audits/735/assets/list";
        expect(menuUtils.screenTitle(pathname)).toEqual("audits/assets/list");
        pathname = "audits/735/submit";
        expect(menuUtils.screenTitle(pathname)).toEqual("submit");
        pathname = "auth/audits/735/assets/64279/details";
        expect(menuUtils.screenTitle(pathname)).toEqual(
            "audits/assets/details"
        );
    });
});
