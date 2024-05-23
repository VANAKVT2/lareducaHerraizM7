import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const onLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    if (!token) {
        return <Navigate to="/login" />
    } else {
        return (
            <div id="defaultLayout">
                <aside>
                    <Link to="/dashboard">Dashboard</Link>
                    {((user.user_type === 1) || (user.user_type === 2)) && (
                        <>
                            <Link to="/users">Users</Link>
                            <Link to="/courses">Courses</Link>
                        </>
                    )}
                    {user.user_type === 0 && (
                        <>
                            <Link to="/games">Games</Link>
                        </>
                    )}

                </aside>
                <div className="content">
                    <header>
                        <div className="">
                            <a onClick={onLogout} className="btn-delete btn-logout" href="#">Logout</a>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                    {notification &&
                        <div className="notification">
                            {notification}
                        </div>
                    }
                </div>
            </div>
        )
    }

}