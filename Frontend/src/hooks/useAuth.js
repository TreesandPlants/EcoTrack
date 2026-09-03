import { useMemo } from "react";

function useAuth(){

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    return useMemo(() => !!token,[token]);

}

export default useAuth;