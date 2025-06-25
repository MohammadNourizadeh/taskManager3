import type { JSX } from "react";
import Admin from "./layout/admin/Admin";
import { Navigate } from "react-router-dom";

type RoutesType = {
    path: string,
    element: JSX.Element,
    children?: RoutesType[]
}

export const routes: RoutesType[] = [
    {
        path: '/',
        element: <Navigate to={'/admin'} />
    },
    {
        path: '/admin',
        element: <Admin />
    }
]