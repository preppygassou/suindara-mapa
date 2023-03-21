import { useEffect, useState } from "react";

const useTextApi = () => {
    const [request, setRequest] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!request) return;
        async function fetchData() {
            try {
                const response = await fetch (...request);
                if (response.ok) {
                    setResult(await response.text());
                    setError(null);
                } else {
                    setError(await response.text());
                }
            } catch(error) {
                setError(error.message);                
            }
        }
        fetchData();
    }, [request]);

    function get(url, options) {
        setRequest([url, options]);
    }
    
    return {
        get,
        result,
        error,
    };
};

export default useTextApi;
