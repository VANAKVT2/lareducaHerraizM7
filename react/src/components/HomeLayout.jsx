import { Outlet } from "react-router-dom"
import HomePageNavbar from "./HomePageNavbar"
import HomePageFooter from "./HomePageFooter"
export default function HomeLayout() {
    return (
        <div className="homePages">
            <HomePageNavbar />
            <Outlet />
            <div style={{ marginTop: "-30px" }}>
                <HomePageFooter />
            </div>
        </div>
    )
}