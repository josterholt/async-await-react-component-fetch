import { useEffect, useState } from "react";

function useFetch(url: string): any {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchController = new AbortController();
    const signal = fetchController.signal;
    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(url, { signal });

                if (!response.ok) {
                    throw new Error(
                        `HTTP Response ${response.status}: ${response.statusText}`
                    );
                }

                const json_obj = await response.json();
                setData(json_obj);
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
