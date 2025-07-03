import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import Admin from "./layout/admin/Admin";
import MyDayPage from "./pages/homePage/MyDayPage";

type RoutesType = {
    path: string,
    element: JSX.Element,
    children?: RoutesType[]
}

export const routes: RoutesType[] = [
    {
        path: '/',
        element: <Navigate to={'/admin/my_day'} />
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: '/admin/my_day',
                element: <MyDayPage />
            }
        ]
    }
]