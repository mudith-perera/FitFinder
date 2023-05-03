
import React from 'react';
import bgimage from "../Images/HomeBG.png";

const DefaultHome = () => {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
                <img src={bgimage} alt="home" style={{ maxWidth: "100%", maxHeight: "100%", marginLeft: "250px" }} />
            </div>

        </div>


    );
}

export default DefaultHome;



