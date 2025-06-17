import * as redux from "react-redux";
import useAuthenticated from "./useAuthenticated";
import { renderHook } from "@testing-library/react-hooks";

const mockedAuthData = {
    accessToken: "123",
    expiresIn: "27000",
    idToken: "",
    refreshToken: "",
    tokenType: "Bearer",
    // account object has been deleted to check loading from localStorage
    expiryDate: "2022-02-25T20:49:59.000Z",
    identityId: "ef02ae59-0a1f-45c1-b3bd-1db95d01ac97",
    username: "alex@checkventory.com",
};

const state = {
    auth: {
        accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2NoZWNrdmVudG9yeWFkYjJjcWEuYjJjbG9naW4uY29tLzExNDIzY2Y1LTAwMDEtNDJkOC1hZjM1LWNjNzBlNjAxYmNkYS92Mi4wLyIsImV4cCI6MTY0ODI2MDY5NywibmJmIjoxNjQ4MjMzNjk3LCJhdWQiOiI4NDIxZWViMS03M2M4LTQ1YzAtYmY5Mi0wNGFhNzRkMjdhMGUiLCJpZHAiOiJMb2NhbEFjY291bnQiLCJvaWQiOiJlZjAyYWU1OS0wYTFmLTQ1YzEtYjNiZC0xZGI5NWQwMWFjOTciLCJzdWIiOiJlZjAyYWU1OS0wYTFmLTQ1YzEtYjNiZC0xZGI5NWQwMWFjOTciLCJuYW1lIjoiQWxleCIsImVtYWlscyI6WyJhbGV4QGNoZWNrdmVudG9yeS5jb20iXSwidGZwIjoiQjJDXzFfUk9QQ19BdXRoIiwiYXpwIjoiODQyMWVlYjEtNzNjOC00NWMwLWJmOTItMDRhYTc0ZDI3YTBlIiwidmVyIjoiMS4wIiwiaWF0IjoxNjQ4MjMzNjk3fQ.o0e1H2AipuJCWaXu56soPH2QBN1c2ZJ3szsoVOttaJ423VRhVmzPfzjKw8Oue8HmhwTjbzl-fbQgAqi3wHs2fB-1M1QHgoBur8UaNH70ftR_bzZwwbXdfNiBgplnWn2LkX_sM3S_R9JQrl14G1qbEvmCnSGeKcEXsLAC9XKMgjQHx0vtnphi4TiopU7zgHXgz6Y40A_Y3884d2iXMlNbQQ_hDA4NuogeqQUyB0oS46V6P---esga45np1pYVNK6-kDSl0tq4gMF65fXXBBwhYE165ZIG0aLvyfICHelxGOzfT6hMZZ-syZdVdxsO2Ygga7BThAKgoVE1mT4h8x-lYQ",
        expiresIn: "27000",
        idToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2NDgyNjA2OTcsIm5iZiI6MTY0ODIzMzY5NywidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9jaGVja3ZlbnRvcnlhZGIyY3FhLmIyY2xvZ2luLmNvbS8xMTQyM2NmNS0wMDAxLTQyZDgtYWYzNS1jYzcwZTYwMWJjZGEvdjIuMC8iLCJzdWIiOiJlZjAyYWU1OS0wYTFmLTQ1YzEtYjNiZC0xZGI5NWQwMWFjOTciLCJhdWQiOiI4NDIxZWViMS03M2M4LTQ1YzAtYmY5Mi0wNGFhNzRkMjdhMGUiLCJpYXQiOjE2NDgyMzM2OTcsImF1dGhfdGltZSI6MTY0ODIzMzY5NywiaWRwIjoiTG9jYWxBY2NvdW50Iiwib2lkIjoiZWYwMmFlNTktMGExZi00NWMxLWIzYmQtMWRiOTVkMDFhYzk3IiwibmFtZSI6IkFsZXgiLCJlbWFpbHMiOlsiYWxleEBjaGVja3ZlbnRvcnkuY29tIl0sInRmcCI6IkIyQ18xX1JPUENfQXV0aCIsImF0X2hhc2giOiIydHJmZ1RsZGtSYVM1U2ZMNWxRbEZBIn0.QKrgyGhinvOf7EszGi7vpSke_YSg-f1ydRCn_KJ_9a1ZFUWCfPSpBM--X19SVxpH9NJp2fgCKXjYDO_VQdL2WJq-ugpWc9OwHkp80Hc_2Yn6nveSKbCh9HeGZlHqMR-nI01d2KJJ4Mptg8ioXoePriwpZQb_VFJXqROdKYmfTVnWesJbWIF5EjciToh9r1SGtXgZQdHp3neQ4xFtbUVzrh-fkyvSQ7uf7l3-yiq6b5V8mH9WYIvk1dt4qSMRs4kwt9IZuhmvmS-JJF08PLf0hcdRHrZiEhnJ7CErw3ZT24o2PbLBYig7-2hXY72LwE92KQ7Y7HUMIlg0iq0KBQuOcw",
        refreshToken:
            "eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..No9LH-NwoScV4yag.o06bRsimNVJDzPpYnzt58DH4wp7DThkA08sGFdhJ9cOkXJHqowu74ZONnrQd2tJ_ZPoamyTdpRQCmehG8PL17IcUD3oMRbXSu4lhstZpycg6lcyxSJJ-PhasYbqYVTno99MgqNFQVuHv6YArwPO-E8t_lUYK2SRN7mGxATplFfUptuPNulpYrVPIAGJKN5nfsqqJJVnKRhcJRp9gNKY31P4BBX1myHtu-gzRjGtGNnXjPcY3n0-YYE43Va01xEk9wyOJNoEYkYszgsu8fO9eqAua4tf12MJwnr5NdHU7TxHzIBsAqAwURQEbFJVbeGcj8QhkOijJ5BuECSgbi54xuwdh33wL2Sz99g_tqXv0pYtLhH6sQ9XFDwZTk3mHolqcsuRzcgEOWBRx8mtyB_he5X_SyFM5qFD7lGyeM23JsP8ISUutwTUmX61n3D4fBoxmLFCQ30AKVXzOTND_4-fSTNSWl5-4vfjFduKjXMUAc5crubRupKV9bcaGmJg10ssVdc8F_c604XhUR-BcPtvn87hqN2V9oSQaD9WBkL-O2kxwEqlYr7-G1OgvlmWJkPFkmSqGJXPuPiqFbrFwd3ro-bc5DaYLDEJr3d3g5MSORinpDVCcvV9Q_fSEFjXWqev8ReRUF4CtwlBf2YskXhWXRn2c-3WuWaDS7r1moNyy.5-xk0SSpv78qXYmJvcI0xw",
        tokenType: "Bearer",
        account: {
            id: 7,
            firstName: "Alex",
            surname: "Test",
            displayName: "Alex",
            lastLogin: "2022-03-25T13:20:00.572672Z",
            email: "alex@checkventory.com",
            groups: [
                {
                    id: 3,
                    name: "Admin",
                },
                {
                    id: 3,
                    name: "Admin",
                },
                {
                    id: 3,
                    name: "Admin",
                },
                {
                    id: 1,
                    name: "Auditor",
                },
                {
                    id: 2,
                    name: "Controller",
                },
                {
                    id: 3,
                    name: "Admin",
                },
                {
                    id: 3,
                    name: "Admin",
                },
                {
                    id: 3,
                    name: "Admin",
                },
                {
                    id: 1,
                    name: "Auditor",
                },
                {
                    id: 2,
                    name: "Controller",
                },
            ],
            identityId: "ef02ae59-0a1f-45c1-b3bd-1db95d01ac97",
            avatarPath:
                "https://cvauditorqa.blob.core.windows.net/audit-data/avatar-images/7/Alex2.jpeg?se=2022-03-26T02%3A41%3A37Z&sp=r&sv=2016-05-31&sr=c&sig=Wmv/RVI5dIqrNdeSNzXLzuPyYZktIWFhv0G5Ueg43YU%3D",
            avatarAltPath: null,
        },
        expiryDate: "2022-02-26T02:11:37.000Z",
        identityId: "ef02ae59-0a1f-45c1-b3bd-1db95d01ac97",
        username: "alex@checkventory.com",
    },
};

describe("hooks/useDistinctAssetTypesForAudit", () => {
    test("using authData from localStorage", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        localStorage.setItem("persist:root", JSON.stringify(mockedAuthData));

        const { result } = renderHook(() => useAuthenticated());

        const { hasAccessToken, hasAccountId, isExpired } = result.current;
        expect(hasAccessToken).toBe(true);
        expect(hasAccountId).toBe(false);
        expect(isExpired).toBe(true);
    });

    test("using authData from state", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        localStorage.setItem("persist:root", "{}");

        const { result } = renderHook(() => useAuthenticated());

        const { hasAccessToken, hasAccountId, isExpired } = result.current;
        expect(hasAccessToken).toBe(true);
        expect(hasAccountId).toBe(true);
        expect(isExpired).toBe(true);
    });
});
