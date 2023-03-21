import { useContext } from "react";
import { ScenarioContext } from "./ScenarioContext";

const useScenario = () => {
    const [state, setState] = useContext(ScenarioContext);

    // useEffect(() => {
    //     if (!territory.error) {
    //         setState(state => ({ ...state, territories: territory.result }));
    //     }
    // }, [territory.result]);

    function setMap(value) {
        setState(state => ({ ...state, map: value }));
    }

    return {
        map: state.map,
        setMap,
    }
};

export default useScenario;