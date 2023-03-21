import { usePasswordless } from "services/auth";
import { useTextApi } from "services/utils";

const useReport = () => {
    const passwordless = usePasswordless();
    const textApi = useTextApi();

    function get(territoryId) {
        const url = `${process.env.REACT_APP_RELATORIO_API_URL}?territorio_id=${territoryId}`;
        const options = {
            headers: {'Authorization': passwordless.token}
        };
        textApi.get(url, options);
    }

    return {
        get,
        result: textApi.result,
        error: textApi.error,
    };
};

export default useReport;