import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const savedAuthData = JSON.parse(localStorage.getItem("authData")) || { token: null };
    const [authToken, setAuthToken] = useState(savedAuthData.token);

    const login = (token) => {
        const authData = { token }; 
        setAuthToken(token);
        localStorage.setItem("authData", JSON.stringify(authData));  
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem("authData"); 
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);