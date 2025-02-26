import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const response = await instance.get("/auth/check", { withCredentials: true });
            if (response.status === 200) {
                setIsUserLoggedIn(true);
            }
        } catch (error) {
            setIsUserLoggedIn(false); 
        }
    }

    async function login() {
        setIsUserLoggedIn(true);
    }

    async function Logout() {
        try {
            const response = await instance.post("/LogoutUser", {}, { withCredentials: true });
            if (response.status === 200) {
                setIsUserLoggedIn(false);
            }
        } catch (error) {
            console.log("Logout Error:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, login, Logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;
