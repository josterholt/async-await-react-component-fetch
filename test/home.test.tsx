import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import fetch from "jest-fetch-mock";
import posts from "./mock/posts-001.json";

const consoleErrorSpy = jest.spyOn(global.console, "error");

describe("App", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", async () => {
        jest.unmock("react");

        fetch.doMock();
        let initialFetchRun = false;
        fetch.mockResponse(async function () {
            initialFetchRun = true;
            return JSON.stringify(posts);
        });

        const { getByTestId } = render(<Home />);
        await waitFor(() => expect(initialFetchRun).toBe(true)); // Wait for fetch to complete, keep console.error clean

        await waitFor(() =>
            expect(getByTestId("title-heading")).toBeInTheDocument()
        );
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("doesn't throw on unmount", async () => {
        fetch.doMock();
        let initialFetchRun = false;
        fetch.mockResponse(async function () {
            initialFetchRun = true;
            return JSON.stringify(posts);
        });

        const { unmount } = render(<Home />);
        await waitFor(() => expect(initialFetchRun).toBe(true)); // Wait for fetch to complete, keep console.error clean

        await waitFor(() => expect(unmount).not.toThrow());
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
});
