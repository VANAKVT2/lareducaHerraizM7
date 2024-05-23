import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import HomePageFooter from "./HomePageFooter";
import HomePageNavbar from "./HomePageNavbar";
export default function HomeLayout() {

    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/dashboard" />
    } else {
        switch (location.pathname) {
            case "/login":
                return (
                    <div>
                        <HomePageNavbar />
                        <Outlet />
                    </div>
                );
            case "/whyathena":
                return (
                    <div>
                        <HomePageNavbar />
                        <Outlet />
                    </div>
                );
            case "/campuses":
                return (
                    <div>
                        <HomePageNavbar />
                        <Outlet />
                    </div>
                );
            default:
                return (
                    <div className="homePages">
                        <HomePageNavbar />
                        <Outlet />
                        <div style={{ bottom: "20px", position: "absolute", marginLeft: "10px" }}>
                            <HomePageFooter></HomePageFooter>
                        </div>
                    </div>
                )
        }

    }
}