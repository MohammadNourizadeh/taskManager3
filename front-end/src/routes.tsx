import { Navigate } from "react-router-dom";
import Admin from "./layout/admin/Admin";
import Auth from "./layout/auth/Auth";
import CheckedTasksPage from "./pages/checkedTasksPage/CheckedTasksPage";
import ImportantTasksPage from "./pages/importantTasksPage/ImportantTasksPage";
import LogInPage from "./pages/logInPage/LogInPage";
import MyDayPage from "./pages/myDayPage/MyDayPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import WeatherPage from "./pages/weatherPage/WeatherPage";
import type { RoutesType } from "./types/types";



export const routes: RoutesType[] = [
    {
        path: '/',
        element: <Navigate to={'/auth/signup'} />
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: '/admin/my_day',
                element: <MyDayPage />
            },
            {
                path: '/admin/important_tasks',
                element: <ImportantTasksPage />
            },
            {
                path: '/admin/checked_tasks',
                element: <CheckedTasksPage />
            },
            {
                path: '/admin/weather',
                element: <WeatherPage />
            }
        ]
    },
    {
        path: '/auth',
        element: <Auth />,
        children: [
            {
                path: '/auth/signup',
                element: <SignUpPage />
            },
            {
                path: '/auth/login',
                element: <LogInPage />
            },
        ]
    }
]