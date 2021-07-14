import { useEffect, useState } from "react";

function useFetch(url: string): any {
    const [response, setResponse] = useState<any>({});
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchController = new AbortController();
    const signal = fetchController.signal;
    useEffect(() => {
        async function fetchPost() {
            try {
                const tmp_response = await fetch(url, { signal });
                setResponse(tmp_response);

                if (tmp_response.ok) {
                    const json_obj = await tmp_response.json();
                    setData(json_obj);
                }
            } catch (error) {
                if (signal.aborted === false) {
                    setError(error);
                }
            }
        }
        fetchPost();

        return () => {
            fetchController.abort();
        };
    }, [url]);

    return { response, data, error };
}
export default useFetch;
