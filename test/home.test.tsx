import React from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import Home from "../pages/index";
import fetch from "jest-fetch-mock";
import posts from "./mock/posts-001.json";

const consoleErrorSpy = jest.spyOn(global.console, "error");

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

    it("Doesn't throw on unmount", async () => {
        fetch.doMock();
        fetch.mockResponse(async function () {
            return JSON.stringify(posts);
        });

        const { unmount } = render(<Home />);

        await waitFor(() => expect(unmount).not.toThrow());
    });
});
