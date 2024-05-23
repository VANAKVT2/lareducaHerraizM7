export default function HomePageFooter() {
    return (
        <div>
            <div className="grid grid-cols-10">
                <div className="columns-2 w-[300px] gap-1">
                    <div className="w-full">
                        <img className="athena-logo" src="imgs/logoMainHome.png" alt="Athena Logo" />
                    </div>
                    <div className="ml-[-50px]">
                        <div className="footer-text">
                            ATHENA<br />
                            INTERNATIONAL<br />
                            UNIVERSITY<br />
                            CATALONIA<br />
                            <br />
                            2024 RIGHTS RESERVED
                        </div>
                    </div>
                </div>
                <div className="collaboration-text ml-20 w-96">IN COLLABORATION WITH:</div>
                <div className="columns-2 w-36 m-12 mt-6">
                    <div className="">
                        <img className="company-logo" src="imgs/aiucvidalbarraquer.png" alt="Company Logo 1" />
                    </div>
                    <br />
                    <div className="">
                        <img className="company-logo" src="imgs/aiuccirera.png" alt="Company Logo 2" />
                    </div>
                    <div className="">
                        <img className="company-logo" src="imgs/aiucpoblenou.png" alt="Company Logo 2" />
                    </div>
                    <br />
                    <div className="">
                        <img className="company-logo" src="imgs/aiucwtc.png" alt="Company Logo 2" />
                    </div>
                </div>
                <div className="columns-2 w-36 m-6 mt-6">
                    <div className="">
                        <img className="company-logo" src="imgs/aiucbellisens.png" alt="Company Logo 2" />
                    </div>
                    <br />
                    <div className="">
                        <img className="company-logo" src="imgs/aiuccet.png" alt="Company Logo 2" />
                    </div>
                    <div className="">
                        <img className="company-logo" src="imgs/aiucgorg.png" alt="Company Logo 2" />
                    </div>
                    <br />
                    <div className="">
                        <img className="company-logo" src="imgs/urv-logo.png" alt="Company Logo 2" />
                    </div>
                </div>
                <div className="w-36 mt-6">
                    <div className="">
                        <img className="company-logo" src="imgs/upf-logo.png" alt="Company Logo 2" />
                    </div>
                    <br />
                    <div className="">
                        <img className="company-logo2" src="imgs/monlau-logo.png" alt="Company Logo 2" />
                    </div>
                </div>
            </div>
        </div>


    )
}