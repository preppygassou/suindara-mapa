import { useContext } from "react";
import { PasswordlessContext } from "./PasswordlessContext";

const usePasswordless = () => {
    const [state, setState] = useContext(PasswordlessContext);

    function setToken(value) {
        setState(state => ({ ...state, token: value }));
    }

    return {
        token: state.token,
        setToken,
    }
};

export default usePasswordless;