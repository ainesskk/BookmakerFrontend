import {useEffect, useState} from "react";
import {createContext} from "react";
import {getToken} from "../api/localStorageFunctions.js";

export const AppContext = createContext(null);

export const AppProvider = ({children}) => {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        if(getToken()) setIsLogged(true);
    }, []);

    return (
        <AppContext.Provider value={{isLogged}}>{children}</AppContext.Provider>
    )
}
