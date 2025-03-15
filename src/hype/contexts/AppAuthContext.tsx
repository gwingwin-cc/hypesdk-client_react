import {createContext, useContext} from "react";

export interface IDecodedToken {
    email: string,
    email_verified: boolean,
    "cognito:username": string,
    sub: string,
}
export interface AuthContextType {
    isAuthenticated: boolean;
    isInit: boolean;
    redirectUri: string;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    setAuth: (a: string, r: string, i: string) => void;
    decodedToken: IDecodedToken | undefined;
    initializeLocalStorage: () => void;
}
export const AppAuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAppAuth = () => {
    const context = useContext(AppAuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}


