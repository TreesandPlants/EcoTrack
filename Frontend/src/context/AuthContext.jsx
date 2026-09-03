import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storage =
            localStorage.getItem("token")
                ? localStorage
                : sessionStorage;

        const token = storage.getItem("token");

        if (token) {

            setUser({

                token,

                id: storage.getItem("userId"),

                full_name: storage.getItem("full_name"),

                email: storage.getItem("email"),

                picture: storage.getItem("picture"),

            });

        }

    }, []);

    return (

        <AuthContext.Provider value={{ user, setUser }}>

            {children}

        </AuthContext.Provider>

    );

}

export const useUser = () => useContext(AuthContext);