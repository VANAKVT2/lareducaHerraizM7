import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import HomeLayout from "./components/HomeLayout";
import CourseContent from "./views/CourseContent";
import CourseForm from "./views/CourseForm";
import Courses from "./views/Courses";
import Dashboard from "./views/Dashboard";
import Games from "./views/Games";
import HomePage from "./views/Home";
import Login from "./views/Login";
import MatriculationsForm from "./views/MatriculationsForm";
import NotFound from "./views/NotFound";
import OurCampuses from "./views/OurCampuses";
import Signup from "./views/Signup";
import StudyInAthena from "./views/StudyInAthena";
import UserForm from "./views/UserForm";
import Users from "./views/Users";
import VirtualCampus from "./views/VirtualCampus";
import WhyAthena from "./views/WhyAthena";
import Hangman from "./views/games/Hangman";
import MusicGame from "./views/games/MusicGame";

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
            },
            {
                path: "/courses",
                element: <Courses />
            },
            {
                path: "/course/:id",
                element: <CourseContent key="courseContent" />
            },
            {
                path: "/courses/new",
                element: <CourseForm key="courseCreate" />
            },
            {
                path: "/courses/:id",
                element: <CourseForm key="courseUpdate" />
            },
            {
                path: "/courses/:id/matriculations",
                element: <MatriculationsForm key="matriculations" />
            },
            {
                path: "/games",
                element: <Games />
            },
            {
                path: "/games/hangedman",
                element: <Hangman />
            },
            {
                path: "/games/piano",
                element: <MusicGame />
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