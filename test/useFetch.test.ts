import useFetch from "../utils/useFetch";
import { renderHook, cleanup } from "@testing-library/react-hooks";
import fetch from "jest-fetch-mock";
import { waitFor } from "@testing-library/dom";
import { resolveHref } from "next/dist/next-server/lib/router/router";

/**
 * ASYNC SCENARIOS WITH HOOK AND COMPONENTS:
 * - RACE CONDITION: fetchPost has several async functions.
 *     - fetch can complete before clean up, but clean up happens in between
 *       response.json() and setData()
 * - Component unmounts before fetch completes, fetchController.abort()
 *     - Abort will make fetch promise rejects /w error, fetchPost ends
 * - Component stays mounted, fetch completes, fetchPost runs in full
 */

describe("useFetch", () => {
    it("can fetch from a URL", async () => {
        const mockData = { sample: "test" };

        let initialFetchRun = false;
        fetch.mockResponse(async () => {
            initialFetchRun = true;
            return JSON.stringify(mockData);
        });

        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch("https://testdomain.com/pathdoesntexist")
        );

        await waitForNextUpdate();
        await waitFor(() => expect(initialFetchRun).toBe(true)); // Wait for initial fetch, also eliminates need for act()

        const data = result.current.data;

        expect(result.current.error).toBeNull();
        expect(data).not.toBeUndefined();
        expect(data).toEqual(mockData);
    });

    it("can handle an HTTP error response", async () => {
        const response_error: string = "Test Error";
        fetch.mockReject(new Error(response_error));

        const { result, waitForNextUpdate } = renderHook(() =>
            useFetch("https://testdomain.com/pathdoesntexist")
        );

        await waitForNextUpdate();

        expect(result.current.error).toEqual(response_error);
    });

    it("can stop fetch during mid-fetch component unmount", async () => {
        const mockData = { sample: "test" };
        let initialFetchRun = false;
        jest.useFakeTimers();

        fetch.mockResponse(async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    initialFetchRun = true;
                    resolve(JSON.stringify(mockData));
                }, 1000);
            });
        });

        const { result, unmount } = renderHook(() =>
            useFetch("https://testdomain.com/pathdoesntexist")
        );

        await waitFor(() => expect(unmount).not.toThrow());

        expect(initialFetchRun).toBe(false);
    });
});
