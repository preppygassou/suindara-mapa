import { createContext, useState } from "react";

const ScenarioContext = new createContext([{}, () => {}]);

const ScenarioProvider = ({ children }) => {
    const [ state, setState ] = useState({
        map: null,
        styles: {},
        territories: {},
    });

    return (
        <ScenarioContext.Provider value={[ state, setState ]}>
            { children }
        </ScenarioContext.Provider>
    );
};

export { ScenarioContext, ScenarioProvider };