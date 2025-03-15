import {createContext, useContext} from "react";

/**
 * AppContext
 * This context is used to store information about the app state
 */
export interface AppDataContextType {
  latestConsoleLocation: string;
    setLatestConsoleLocation: (a: string) => void;
}
export const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within a AppProvider');
    }
    return context;
}


