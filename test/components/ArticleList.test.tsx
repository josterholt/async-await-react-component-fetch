import React from "react";
import { render, within, waitFor, act } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import posts from "../mock/posts-001.json";
import ArticleList from "../../components/ArticleList";

const consoleErrorSpy = jest.spyOn(global.console, "error");

describe("ArticleList", () => {
    afterEach(() => {
        consoleErrorSpy.mockReset();
        jest.clearAllMocks();
    });

    it("lists all articles", async () => {
        fetch.mockResponse(async function () {
            return JSON.stringify(posts);
        });

        const { getByRole } = render(<ArticleList />);
        const list = getByRole("list", {
            name: /articles/i,
        });

        const { findAllByRole } = within(list);
        const items: Array<HTMLElement> = await findAllByRole("listitem");

        expect(items.length).toBe(posts.length);
        expect(items[0].textContent).toBe(posts[0].title); // This could be problematic if the title includes HTML
    });

    it("can handle an HTTP error response", async () => {
        const response_error: string = "Test Error";
        fetch.mockReject(new Error(response_error));

        const { findByText } = render(<ArticleList />);

        expect(await findByText(response_error)).toBeInTheDocument();
    });

    /*
     * Tests if useFetch will bail out properly when component unmounts
     * mid-fetch. Ideally this test would be in useFetch.tests.ts. However,
     * I haven't been able to recreate the race condition with the hook alone.
     */
    it("doesn't generate message to console.error on unmount", async () => {
        fetch.mockResponse(async function () {
            return JSON.stringify(posts);
        });

        const { unmount } = render(<ArticleList />);
        await waitFor(() => expect(unmount).not.toThrow());

        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
});
