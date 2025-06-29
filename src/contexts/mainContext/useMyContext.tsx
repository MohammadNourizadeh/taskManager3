import { useContext } from "react";
import MainContext from "./MainContext";


export function useMyContext() {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error("useMainContext must be used within a MainContextProvider");
    }
    return context;
}
