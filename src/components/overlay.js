import React from "react"
import blueBlob from "../images/blueBlob.png"
import yellowBlob from "../images/yellowBlob.png"

const Overlay = ({
    overlayStyles,
    hideOverlay
})=>(
    <div style={overlayStyles} className="overlay layout">
        <div >
            
            <h1 className="overLayTitle">Quizzical</h1>
            <h6 className="overLayText">Some description if needed</h6>
            <button onClick={hideOverlay} className="overlayButton">Start quiz</button>
        </div>
        <img src={blueBlob} className="blueBlob"/>
        <img src={yellowBlob} className="yellowBlob"/>
    </div>
)


export default Overlay