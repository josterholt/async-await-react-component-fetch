import { useEffect, useState } from "react";

function useFetch(url: string): any {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>("");

    useEffect(() => {
        const fetchController = new AbortController();

        async function fetchPost() {
            try {
                const response = await fetch(url, {
                    signal: fetchController.signal,
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP Response ${response.status}: ${response.statusText}`
                    );
                }
                const json_obj = await response.json();

                // Good ol' fashion race condition
                if (!fetchController.signal.aborted) {
                    setData(json_obj);
                }
            } catch (error: any) {
                setError(error.message);
            }
        }
        fetchPost();

        return () => {
            fetchController.abort();
        };
    }, [url]);

    return { data, error };
}
export default useFetch;
