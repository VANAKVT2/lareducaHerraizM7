import { Navigate, createBrowserRouter } from "react-router-dom";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import HomePage from "./views/Home";
import HomeLayout from "./components/HomeLayout";
import WhyAthena from "./views/WhyAthena";
import OurCampuses from "./views/OurCampuses";
import StudyInAthena from "./views/StudyInAthena";
import VirtualCampus from "./views/VirtualCampus";
import UserForm from "./views/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/main" />
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    },
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                path: "/main",
                element: <HomePage />
            },
            {
                path: "/whyathena",
                element: <WhyAthena />
            },
            {
                path: "/campuses",
                element: <OurCampuses />
            },
            {
                path: "/study",
                element: <StudyInAthena />
            },
            {
                path: "/virtualcampus",
                element: <VirtualCampus />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;  