import { useEffect, useState } from "react";
import { Vector as VectorSource } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';

const useGeoJsonApi = () => {
    const [request, setRequest] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!request) return;
        async function fetchData() {
            try {
                const response = await fetch (...request);
                if (response.ok) {
                    setResult(format(await response.json()));
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

    function format(data) {
        const format = new GeoJSON();
        let features = [];
        if (Object.keys(data).length > 0) {
            features = format.readFeatures(
                data,
                { featureProjection: 'EPSG:3857' }
            );
        }
        return new VectorSource({ features: features });
    };
        
    function get(url, options) {
        setRequest([url, options]);
    }
    
    return {
        get,
        result,
        error,
    };
};

export default useGeoJsonApi;
