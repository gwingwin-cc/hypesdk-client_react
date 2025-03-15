import {ReactNode, useState} from "react";
import {AppDataContext} from "./AppDataContext";

export interface IUserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
    roles: string[];
}

export const AppDataProvider = (props: {
    children: ReactNode
}) => {
    // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const [latestConsoleLocation, setLatestConsoleLocation] = useState<string>('/console');
    const [profile, setProfile] = useState<IUserProfile>();

    return <>
        <AppDataContext.Provider value={{  latestConsoleLocation, setLatestConsoleLocation }}>
            {props.children}
        </AppDataContext.Provider>
    </>

}
