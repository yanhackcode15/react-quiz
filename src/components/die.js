import React from "react"
import ReactDOM from "react-dom"
import Dot from "./dot"



export default function Die(props) {
    //render the number of dots based on the value
    const dots = []
    function generateDots(count){
        let class_name=""
        for (let i=0; i<count; i++) {
            if(count===5){
                switch(i){
                    case 0:
                        class_name="dot1"
                        break;
                    case 1:
                        class_name="dot2"
                        break;
                    case 2:
                        class_name="dot3"
                        break;
                    case 3:
                        class_name="dot4"
                        break;
                    case 4:
                        class_name="dot5"
                        break;
                    default:
                        class_name=""
                }
            }
            dots.push(<Dot className={class_name}/>)
        }
        return dots
        
    }
    const styles = {
        backgroundColor: props.isHeld?"#59E391":"white"
    }

    function dotsClassName(numDot){
        let name=""
        switch(numDot) {
            case 1:
                name="one"
                break;
            case 2:
                name="two"
                break;
            case 3:
                name="three"
                break;
            case 4:
                name= "four"
                break;
            case 5:
                name= "five"
                break;
            case 6:
                name= "six"
                break;
            default:
                name=""
        }
        return name
        
    }
    return (     
        <div 
            className={"die dice_dots "+dotsClassName(props.value)} 
            onClick={props.onClick} 
            style={styles}
        >
            {/* {props.value} */}
            {/* {generateDots(props.value)} */}
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
 
    )
}