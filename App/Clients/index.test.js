import React from "react";
import { customRender, fireEvent, waitFor } from "@/jest-test/test-utils";
import * as redux from "react-redux";
import Audits from "./index";
import { useNavigate } from "react-router-dom";
import { audits } from "@/jest-test-data/audits";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate
}));

const state = { audits };

describe("Audits", () => {});
