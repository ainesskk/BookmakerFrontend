import { useEffect, useState, createContext } from "react";
import { getToken } from "../api/localStorageFunctions.js";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogin = async () => {
            const token = await getToken();
            console.log("Fetched token:", token);
            if (token) {
                setIsLogged(true);
                console.log("User is logged in");
            } else {
                setIsLogged(false);
                console.log("User is not logged in");
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
