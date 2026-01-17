import { createContext, useContext, useState } from "react";

export const AuthContext= createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData = { name: "Demo" }) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);