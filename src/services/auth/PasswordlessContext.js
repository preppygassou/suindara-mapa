import { createContext, useState } from "react";

const PasswordlessContext = new createContext([{}, () => {}]);

const PasswordlessProvider = ({ children }) => {
    const [ state, setState ] = useState({
        token: null,
    });

    return (
        <PasswordlessContext.Provider value={[ state, setState ]}>
            { children }
        </PasswordlessContext.Provider>
    );
};

export { PasswordlessContext, PasswordlessProvider };