import { useEffect, useState, createContext } from "react";
import { getToken } from "../api/localStorageFunctions.js";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogin = async () => {
            const token = await getToken();
            if (token) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
            setLoading(false);
        }
        fetchLogin();
    }, []);

    return (
        <AppContext.Provider value={{ isLogged, setIsLogged, loading }}>
            {children}
        </AppContext.Provider>
    );
}
