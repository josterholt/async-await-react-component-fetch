import React from "react";
import {
    act,
    logRoles,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import Home from "../pages/index";
import fetch from "jest-fetch-mock";
import posts from "./mock/posts-001.json";

const consoleErrorSpy = jest.spyOn(global.console, "error");

describe("App", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", async () => {
        // jest.unmock("react");

        fetch.doMock();
        let initialFetchRun = false;
        fetch.mockResponse(async function () {
            initialFetchRun = true;
            return JSON.stringify(posts);
        });

        const { getByTestId } = render(<Home />);

        await waitFor(() =>
            expect(getByTestId("title-heading")).toBeInTheDocument()
        );
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("lists all articles", async () => {
        fetch.mockResponse(async function () {
            return JSON.stringify(posts);
        });

        const { getByRole } = render(<Home />);
        const list = getByRole("list", {
            name: /articles/i,
        });

        const { findAllByRole } = within(list);
        const items: Array<HTMLElement> = await findAllByRole("listitem");

        expect(items.length).toBe(posts.length);
        expect(items[0].textContent).toBe(posts[0].title); // This could be problematic if the title includes HTML
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
