import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePageNavbar() {
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState("");

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location]);

    if (currentRoute === "/virtualcampus") {
        document.getElementById("mainVirtualCampus").style.overflowY = "hidden";
    }

    return (
        <div className="homeNavBar">
            <div className="homeNavBar" style={{ zIndex: 20 }}>
                <div className={`navBarSection`}><Link to={"/whyathena"} className={`${currentRoute === "/whyathena" ? "activesection" : "notactivesection"}`}>WHY <br />ATHENA</Link></div>
                <div className={`navBarSection`}><Link to={"/campuses"} className={`${currentRoute === "/campuses" ? "activesection" : "notactivesection"}`}>OUR <br />CAMPUSES</Link></div>
                <div className={`navBarSection`}><Link to={"/study"} className={`${currentRoute === "/study" ? "activesection" : "notactivesection"}`}>STUDY<br />IN ATHENA</Link></div>
                <div className={`navBarSection`}><Link to={"/virtualcampus"} className={`${currentRoute === "/virtualcampus" ? "activesection" : "notactivesection"}`}>VIRTUAL<br />CAMPUS</Link></div>
                <Link to={"/main"}><img src="/imgs/logoNavbarHome.png" alt="placeholder" /></Link>
            </div>
        </div>
    );
}