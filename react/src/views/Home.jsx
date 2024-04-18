export default function HomePage() {
    return (
        <div className="home">
            <div className="row">
                <div className="column">
                    <img className="mainPageLogo" src="/imgs/logoMainHome.png" />
                </div>
                <div className="column" style={{ marginTop: "4%" }}>
                    <div class="mainPageTitle">ATHENA</div>
                    <div class="mainPageTitle">INTERNATIONAL</div>
                    <div class="mainPageTitle">UNIVERSITY</div>
                    <div class="mainPageTitle">CATALONIA</div>
                </div>

                <div className="column">
                    <div class="ranked-wrapper">
                        <div class="medal"></div>
                        <div class="rankedText">
                            19TH<br />BEST UNIVERSITY<br />WORLWIDE<br />2023
                        </div>
                        <img class="sponsor_logo" src="/imgs/THElogo.png" alt="Sponsor Logo" />
                    </div>
                    <div class="ranked-wrapper">
                        <div class="medal2"></div>
                        <div class="rankedText2">
                            8TH<br />BEST UNIVERSITY<br />IN SPAIN<br />2023
                        </div>
                        <img class="sponsor_logo2" src="/imgs/forbeslogo.png" alt="Sponsor Logo" />
                    </div>
                </div>
            </div>
        </div>
    )
}


