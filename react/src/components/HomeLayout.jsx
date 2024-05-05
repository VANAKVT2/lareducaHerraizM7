import { Outlet } from "react-router-dom"
import HomePageNavbar from "./HomePageNavbar"
import HomePageFooter from "./HomePageFooter"
import { Navigate } from "react-router-dom"
export default function HomeLayout() {

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