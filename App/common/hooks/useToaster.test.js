import React from "react";
import { useDispatch } from "react-redux";
import { waitFor } from "@/jest-test/test-utils";
import useToaster from "./useToaster";
import { renderHook } from "@testing-library/react-hooks";

const mockedDispatch = jest.fn();

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockedDispatch,
}));

describe("hooks/useToaster", () => {
    test("test info,error,warning,success dispatch", async () => {
        const dispatch = useDispatch();

        const { result } = renderHook(() => useToaster());
        const toast = result.current;

        await waitFor(() => {
            toast.info("Info test message");
            const expectedResult = {
                payload: { message: "Info test message" },
                type: "TOAST_INFO",
            };
            expect(dispatch).toHaveBeenCalledWith(expectedResult);
        });

        await waitFor(() => {
            toast.error("Error test message");
            const expectedResult = {
                payload: { message: "Error test message" },
                type: "TOAST_ERROR",
            };
            expect(dispatch).toHaveBeenCalledWith(expectedResult);
        });

        await waitFor(() => {
            toast.warning("Warning test message");
            const expectedResult = {
                payload: { message: "Warning test message" },
                type: "TOAST_WARNING",
            };
            expect(dispatch).toHaveBeenCalledWith(expectedResult);
        });

        await waitFor(() => {
            toast.success("Success test message");
            const expectedResult = {
                payload: { message: "Success test message" },
                type: "TOAST_SUCCESS",
            };
            expect(dispatch).toHaveBeenCalledWith(expectedResult);
        });
    });
});
