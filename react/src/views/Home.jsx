import HomePageFooter from "../components/HomePageFooter";

export default function HomePage() {
    return (
        <div className="home">
            <div className="row">
                <div className="column">
                    <img className="mainPageLogo" src="/imgs/logoMainHome.png" />
                </div>
                <div className="column" style={{ marginTop: "4%" }}>
                    <div className="mainPageTitle">ATHENA</div>
                    <div className="mainPageTitle">INTERNATIONAL</div>
                    <div className="mainPageTitle">UNIVERSITY</div>
                    <div className="mainPageTitle">CATALONIA</div>
                </div>

                <div className="column">
                    <div className="ranked-wrapper">
                        <div className="medal"></div>
                        <div className="rankedText">
                            19TH<br />BEST UNIVERSITY<br />WORLWIDE<br />2023
                        </div>
                        <img className="sponsor_logo" src="/imgs/THElogo.png" alt="Sponsor Logo" />
                    </div>
                    <div className="ranked-wrapper">
                        <div className="medal2"></div>
                        <div className="rankedText2">
                            8TH<br />BEST UNIVERSITY<br />IN SPAIN<br />2023
                        </div>
                        <img className="sponsor_logo2" src="/imgs/forbeslogo.png" alt="Sponsor Logo" />
                    </div>
                </div>

            </div>
        </div>
    )
}


