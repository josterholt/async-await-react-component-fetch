import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import fetch from "jest-fetch-mock";
import posts from "./mock/posts-001.json";

describe("App", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Renders without crashing", async () => {
        jest.unmock("react");

        fetch.doMock();
        fetch.mockResponse(async function () {
            //jest.advanceTimersByTime(60);
            return JSON.stringify(posts);
        });

        const { getByText } = render(<Home />);

        await waitFor(() =>
            expect(getByText("Async/Await Example")).toBeInTheDocument()
        );
    });

    it("Doesn't throw on unmount", async () => {
        fetch.doMock();
        fetch.mockResponse(async function () {
            return JSON.stringify(posts);
        });

        const { unmount } = render(<Home />);

        await waitFor(() => expect(unmount).not.toThrow());
    });
});
