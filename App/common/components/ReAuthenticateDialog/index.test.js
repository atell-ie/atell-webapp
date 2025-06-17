import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as redux from "react-redux";
import ReAuthenticateDialog from "./index";
import { customRender, waitFor, fireEvent } from "@/jest-test/test-utils";

const mockedUseNavigate = jest.fn();
const mockedUseLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate,
    useLocation: () => mockedUseLocation,
}));

const mockedUseDispatch = jest.fn();

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockedUseDispatch,
}));

const locationSpy = jest.spyOn(window, "location", "get");

const state = {
    // partial auth state
    auth: {
        accessToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL2NoZWNrdmVudG9yeWFkYjJjcWEuYjJjbG9naW4uY29tLzExNDIzY2Y1LTAwMDEtNDJkOC1hZjM1LWNjNzBlNjAxYmNkYS92Mi4wLyIsImV4cCI6MTY0ODI2MDY5NywibmJmIjoxNjQ4MjMzNjk3LCJhdWQiOiI4NDIxZWViMS03M2M4LTQ1YzAtYmY5Mi0wNGFhNzRkMjdhMGUiLCJpZHAiOiJMb2NhbEFjY291bnQiLCJvaWQiOiJlZjAyYWU1OS0wYTFmLTQ1YzEtYjNiZC0xZGI5NWQwMWFjOTciLCJzdWIiOiJlZjAyYWU1OS0wYTFmLTQ1YzEtYjNiZC0xZGI5NWQwMWFjOTciLCJuYW1lIjoiQWxleCIsImVtYWlscyI6WyJhbGV4QGNoZWNrdmVudG9yeS5jb20iXSwidGZwIjoiQjJDXzFfUk9QQ19BdXRoIiwiYXpwIjoiODQyMWVlYjEtNzNjOC00NWMwLWJmOTItMDRhYTc0ZDI3YTBlIiwidmVyIjoiMS4wIiwiaWF0IjoxNjQ4MjMzNjk3fQ.o0e1H2AipuJCWaXu56soPH2QBN1c2ZJ3szsoVOttaJ423VRhVmzPfzjKw8Oue8HmhwTjbzl-fbQgAqi3wHs2fB-1M1QHgoBur8UaNH70ftR_bzZwwbXdfNiBgplnWn2LkX_sM3S_R9JQrl14G1qbEvmCnSGeKcEXsLAC9XKMgjQHx0vtnphi4TiopU7zgHXgz6Y40A_Y3884d2iXMlNbQQ_hDA4NuogeqQUyB0oS46V6P---esga45np1pYVNK6-kDSl0tq4gMF65fXXBBwhYE165ZIG0aLvyfICHelxGOzfT6hMZZ-syZdVdxsO2Ygga7BThAKgoVE1mT4h8x-lYQ",
        expiresIn: "27000",
        idToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE2NDgyNjA2OTcsIm5iZiI6MTY0ODIzMzY5NywidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9jaGVja3ZlbnRvcnlhZGIyY3FhLmIyY2xvZ2luLmNvbS8xMTQyM2NmNS0wMDAxLTQyZDgtYWYzNS1jYzcwZTYwMWJjZGEvdjIuMC8iLCJzdWIiOiJlZjAyYWU1OS0wYTFmLTQ1YzEtYjNiZC0xZGI5NWQwMWFjOTciLCJhdWQiOiI4NDIxZWViMS03M2M4LTQ1YzAtYmY5Mi0wNGFhNzRkMjdhMGUiLCJpYXQiOjE2NDgyMzM2OTcsImF1dGhfdGltZSI6MTY0ODIzMzY5NywiaWRwIjoiTG9jYWxBY2NvdW50Iiwib2lkIjoiZWYwMmFlNTktMGExZi00NWMxLWIzYmQtMWRiOTVkMDFhYzk3IiwibmFtZSI6IkFsZXgiLCJlbWFpbHMiOlsiYWxleEBjaGVja3ZlbnRvcnkuY29tIl0sInRmcCI6IkIyQ18xX1JPUENfQXV0aCIsImF0X2hhc2giOiIydHJmZ1RsZGtSYVM1U2ZMNWxRbEZBIn0.QKrgyGhinvOf7EszGi7vpSke_YSg-f1ydRCn_KJ_9a1ZFUWCfPSpBM--X19SVxpH9NJp2fgCKXjYDO_VQdL2WJq-ugpWc9OwHkp80Hc_2Yn6nveSKbCh9HeGZlHqMR-nI01d2KJJ4Mptg8ioXoePriwpZQb_VFJXqROdKYmfTVnWesJbWIF5EjciToh9r1SGtXgZQdHp3neQ4xFtbUVzrh-fkyvSQ7uf7l3-yiq6b5V8mH9WYIvk1dt4qSMRs4kwt9IZuhmvmS-JJF08PLf0hcdRHrZiEhnJ7CErw3ZT24o2PbLBYig7-2hXY72LwE92KQ7Y7HUMIlg0iq0KBQuOcw",
        account: {
            id: 7,
            firstName: "Alex",
            surname: "Test",
            displayName: "Alex",
            lastLogin: "2022-03-25T13:20:00.572672Z",
            email: "alex@checkventory.com",
            identityId: "ef02ae59-0a1f-45c1-b3bd-1db95d01ac97",
        },
        expiryDate: "2022-02-26T02:11:37.000Z",
        identityId: "ef02ae59-0a1f-45c1-b3bd-1db95d01ac97",
        username: "alex@checkventory.com",
    },
};

describe("ReAuthenticateDialog", () => {
    jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
        callback(state)
    );
    const original = window.location;

    beforeAll(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: { reload: jest.fn() },
        });
    });

    afterAll(() => {
        Object.defineProperty(window, "location", {
            configurable: true,
            value: original,
        });
    });

    test("test dialog presence", async () => {
        const { getByText, getByRole, container } = customRender(
            <ReAuthenticateDialog />
        );

        await waitFor(() => {
            expect(getByText(state.auth.username)).toBeInTheDocument();
            expect(
                getByRole("button", {
                    name: /CANCEL/i,
                })
            ).toBeInTheDocument();
            expect(
                getByRole("button", {
                    name: /SUBMIT/i,
                })
            ).toBeInTheDocument();
            expect(container).toMatchSnapshot();
        });
    });

    test("test Cancel and Submit buttons", async () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const mockedLocationReload = jest.fn();
        locationSpy.mockImplementation(() => ({
            reload: () => mockedLocationReload,
        }));

        const { getByRole } = customRender(<ReAuthenticateDialog />);

        const cancelBtn = getByRole("button", {
            name: /CANCEL/i,
        });

        const submitBtn = getByRole("button", {
            name: /SUBMIT/i,
        });

        await waitFor(() => {
            fireEvent.click(cancelBtn);
            fireEvent.click(submitBtn);
        });

        expect(navigate).toHaveBeenCalledWith("/login");
        expect(dispatch).toHaveBeenCalled();
        expect(window.location.reload).toHaveBeenCalled();
    });
});
