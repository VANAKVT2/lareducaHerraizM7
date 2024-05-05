import LoginForm from "../components/LoginForm"
import HomePageFooter from "../components/HomePageFooter";
export default function VirtualCampus() {
    return (
        <div id="mainVirtualCampus" className="row">
            <div className="col">
                <h1 className="title">
                    START YOUR ADVENTURE
                </h1>
                <p className="presentationText">
                    Login into the Virtual Campus to hand in your work or reattend recorded classes.
                </p>
            </div>
            <div className="col" style={{ position: "", marginTop: "-160px", marginLeft: "350px" }}>
                <LoginForm></LoginForm>
            </div>
            <div>
                <img src="" alt="" />
            </div>

        </div>
    )
}

