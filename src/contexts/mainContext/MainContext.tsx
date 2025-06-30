import { createContext, useState, type ReactNode } from "react";

type MainContextProviderPropsType = {
    children: ReactNode;
}

type MainContextProviderValueType = {
    pageName: string,
    setPageName: React.Dispatch<React.SetStateAction<string>>,
    tasks: TasksType[],
    setTasks: React.Dispatch<React.SetStateAction<TasksType[]>>
}


export type TasksType = {
    id: number,
    name: string,
    date: string,
    isImportant: boolean,
    isDone: boolean
}

const MainContext = createContext<MainContextProviderValueType | null>(null)

export const MainContextProvider = ({ children }: MainContextProviderPropsType) => {
    // states
    const [pageName, setPageName] = useState<string>('my day')
    const [tasks, setTasks] = useState<TasksType[]>([])


    return (
        < MainContext.Provider value={{
            pageName,
            setPageName,
            tasks,
            setTasks
        }}>
            {children}
        </MainContext.Provider >
    )
}

export default MainContext;