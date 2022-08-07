import React from "react"
import ReactDOM from "react-dom"



export default function Quiz({quiz, index, graded, onClickAnswer, }) {
   //quiz is the quiz object, an array element of quiz set, onClickAnswer is the function that modifies quiz object attributes
   
    function setAnswerStyles(clicked, isCorrect, graded){
            const defaultStyles = {border: "solid", backgroundColor: "transparent", borderColor: "#293264", color: "#293264", borderWidth: "1.5px"}
            if(graded) {
                if (clicked&&isCorrect) {
                    return {...defaultStyles, backgroundColor: "#94D7A2", color: "#293264", borderColor: "#94D7A2"}
                }
                else if(clicked){
                    return {...defaultStyles, backgroundColor: "#F8BCBC", borderColor: "#F8BCBC"}
                }
                else if (isCorrect){
                    return {...defaultStyles, backgroundColor: "#94D7A2", color: "#293264",borderColor: "red"}
    
                }
                else {
                    return {...defaultStyles}
                }
            }
            else {
                return clicked?{...defaultStyles, backgroundColor:"#D6DBF5", borderColor: "#D6DBF5"}:{...defaultStyles}
            }
        }
    // const {question, answers, graded} = quiz; 
    // console.log('rendered', quiz)
    return (     
        <div key={`q-${index}`}>
            <h2 className="quizQuestion">{quiz.question}</h2>
            <ul className="quizAnswers">
                {
                quiz.answers.map((answer, j)=>{
                    return (
                    <li 
                        key={`q-${index}-a-${j}`} 
                        
                        >
                            <button 
                            className="quizAnswerButton"
                            onClick={()=>{!graded&&onClickAnswer(index,j)}}//if already graded, don't allow clicks. 
                            style={setAnswerStyles(answer.clicked, answer.isCorrect, graded)}
                            >{answer.data}</button>
                        
                    </li>)}) 
                }
            </ul>
        </div>
 
    )
}
