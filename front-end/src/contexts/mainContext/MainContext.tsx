import { createContext, useState } from "react";
import type { MainContextProviderPropsType, MainContextProviderValueType } from "../../types/types";



const MainContext = createContext<MainContextProviderValueType | null>(null)

export const MainContextProvider = ({ children }: MainContextProviderPropsType) => {
    // states
    const [pageName, setPageName] = useState<string>('my day')

    return (
        < MainContext.Provider value={{
            pageName,
            setPageName,
        }}>
            {children}
        </MainContext.Provider >
    )
}

export default MainContext;