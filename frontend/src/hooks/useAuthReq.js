import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/axios";

function useAuthReq() {
    const { isSignedIn, getToken, isLoaded } = useAuth();

    // Include session token in request header
    useEffect(() => {
        const interceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });

        return () => api.interceptors.request.eject(interceptor);
    }, [getToken]);

    return { isSignedIn, isClerkLoaded: isLoaded };
}

export default useAuthReq;
