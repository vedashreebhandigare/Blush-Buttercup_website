import { createContext, useContext, ReactNode } from "react";

const InternetIdentityContext = createContext<any>(null);

export function InternetIdentityProvider({ children }: { children: ReactNode }) {
    // Mock identity provider
    const value = {
        identity: null,
        login: async () => { },
        logout: async () => { },
        isAuthenticated: false
    };

    return (
        <InternetIdentityContext.Provider value= { value } >
        { children }
        </InternetIdentityContext.Provider>
    );
}

export function useInternetIdentity() {
    return useContext(InternetIdentityContext);
}
