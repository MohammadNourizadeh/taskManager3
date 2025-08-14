import { createContext, useState } from "react";
import type { MainContextProviderPropsType, MainContextProviderValueType, ModalValueType, TasksType } from "../../types/types";



const MainContext = createContext<MainContextProviderValueType | null>(null)

export const MainContextProvider = ({ children }: MainContextProviderPropsType) => {
    // states
    const [pageName, setPageName] = useState<string>('my day')
    const [tasks, setTasks] = useState<TasksType[]>([])
    const [confirmModalInfo, setConfirmModalInfo] = useState<ModalValueType<TasksType>>({ isModalOpen: false, array: [], arrayItem: { id: 0, name: '', date: '', isImportant: false, isDone: false } })

    return (
        < MainContext.Provider value={{
            pageName,
            setPageName,
            tasks,
            setTasks,
            confirmModalInfo,
            setConfirmModalInfo,
        }}>
            {children}
        </MainContext.Provider >
    )
}

export default MainContext;