import {ReactNode, useEffect, useState} from "react";
import {AppAuthContext, IDecodedToken} from "./AppAuthContext";
import { jwtDecode } from "jwt-decode";

const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
const responseType = 'code'
const scope = 'email openid phone'
let redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URL;

export const AppAuthProvider = (props: {
    children: ReactNode
}) => {
    // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isInit, setIsInit] = useState<boolean>(false);
    const [, setAccessToken] = useState<string>();
    const [, setRefreshToken] = useState<string>();
    const [, setIdToken] = useState<string>();
    const [decodedToken, setDecodedToken ] = useState<IDecodedToken>();

    useEffect(() => {
        if (!isInit) {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const idToken = localStorage.getItem('idToken');
            if (accessToken && refreshToken && idToken) {
                setAuth(accessToken, refreshToken, idToken);
            }else{
                setIsAuthenticated(false);
            }
            setIsInit(true);
        }
    }, [isInit]);

    const login = async () => {
        const url = domain + '/login?client_id=' + clientId + '&response_type=' + responseType + '&scope=' + scope + '&redirect_uri=' + redirectUri;
        console.log(url)
       window.open(url);
    }

    const setAuth = (accessToken: string, refreshToken: string, idToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('idToken', idToken);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIdToken(idToken);
        setIsAuthenticated(true);
        setDecodedToken(jwtDecode(idToken));
        console.log(jwtDecode(idToken))
    }
    const logout = async () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setDecodedToken(undefined);
        window.location.href = '/';
    }
    return <>
        <AppAuthContext.Provider value={{ decodedToken, redirectUri, setAuth, isInit, isAuthenticated, login, logout }}>
            {props.children}
        </AppAuthContext.Provider>
    </>

}
