import { createContext, useState, type ReactNode } from "react";

type MainContextProviderPropsType = {
    children: ReactNode;
}

type MainContextProviderValueType = {
    pageName: string,
    setPageName: React.Dispatch<React.SetStateAction<string>>
}

const MainContext = createContext<MainContextProviderValueType | null>(null)

export const MainContextProvider = ({ children }: MainContextProviderPropsType) => {
    // states
    const [pageName, setPageName] = useState<string>('my day')


    return (
        < MainContext.Provider value={{
            pageName,
            setPageName
        }}>
            {children}
        </MainContext.Provider >
    )
}

export default MainContext;