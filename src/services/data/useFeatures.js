import { useEffect, useState} from 'react';
import { useConstructor } from "services/utils";
import { useGeoJsonApi } from "services/utils";
import { usePasswordless } from "services/auth";
import { useLocation } from "react-router-dom";

const useFeatures = () => {
    const passwordless = usePasswordless();
    const desmatamento = useGeoJsonApi();
    const focoDeCalor = useGeoJsonApi();
    const territorio = useGeoJsonApi();
    const [listaTerritorio, setListaTerritorio] = useState([]);
    const { search } = useLocation();
    
    useConstructor(() => {
        getFeatures();
    });

    function getFeatures() {
        const params = new URLSearchParams(search);
        let territorioId = params.get('t_id')
        let yesterday = new Date(new Date().setDate(new Date().getDate()-30)).toISOString();
        let data = params.get('data') ? params.get('data') : yesterday
        let query = `?data=${encodeURIComponent(data)}`
        if (territorioId) query += `&territorio_id=${territorioId}`;

        const baseUrl = `${process.env.REACT_APP_GEOJSON_API_URL}${query}&tipo=`;
        const options = {
            headers: {'Authorization': passwordless.token}
        };

        desmatamento.get(`${baseUrl}DESMATAMENTO`, options);
        focoDeCalor.get(`${baseUrl}FOCO_DE_CALOR`, options);
        territorio.get(`${baseUrl}TERRITORIO`, options);
    }

    useEffect(() => {		
		if (territorio.result) {
            let listaTerritorio = []
            let escape = []
            territorio.result.forEachFeature(function (f){
                if (!escape.includes(f.get('id'))){
                    listaTerritorio.push({
                        id:f.get('id'),
                        nome: f.get('Nome')
                    });
                    escape.push(f.get('id'))
                }  

            });	
            setListaTerritorio(listaTerritorio)	
		}
	}, [territorio.result]);

    return {
        desmatamento: desmatamento.result,
        focoDeCalor: focoDeCalor.result,
        territorio: territorio.result,
        listaTerritorio:listaTerritorio,
    };
};

export default useFeatures;