import React from "react"
import ReactDOM from "react-dom"



export default function Quiz({quiz, index, graded, onClickAnswer, }) {
   //quiz is the quiz object, an array element of quiz set, onClickAnswer is the function that modifies quiz object attributes
    function setAnswerStyles(clicked, isCorrect, graded){
            const defaultStyles = {color: "black"}
            if(graded) {
                if (clicked&&isCorrect) {
                    return {...defaultStyles, color:"green"}
                }
                else if(clicked){
                    return {...defaultStyles, color: "red"}
                }
                else if (isCorrect){
                    return {...defaultStyles, color: "green"}
    
                }
                else {
                    return {...defaultStyles, color: "black"}
                }
            }
            else {
                return clicked?{...defaultStyles, color:"purple"}:{...defaultStyles, color:"black"}
            }
        }
    // const {question, answers, graded} = quiz; 
    // console.log('rendered', quiz)
    return (     
        <div key={`q-${index}`}>
            <h2>{quiz.question}</h2>
            <ul>
                {
                quiz.answers.map((answer, j)=>{
                    return (
                    <li 
                        key={`q-${index}-a-${j}`} 
                        onClick={()=>{onClickAnswer(index,j)}}
                        style={setAnswerStyles(answer.clicked, answer.isCorrect, graded)}
                        >
                        {answer.data}
                    </li>)}) 
                }
            </ul>
        </div>
 
    )
}


 // function renderedQuizzes(quizArray){
    //     return quizArray.map((quiz, i)=>{
    //         const temp = (
    //         <div key={`q-${i}`}>
    //             <h2>{quiz.question}</h2>
    //             <ul>
    //                 {
    //                 quiz.answers.map((answer, j)=>{
                        
    //                     return (
    //                     <li 
    //                         key={`q-${i}-a-${j}`} 
    //                         onClick={()=>{answerChosen(i,j)}}
    //                         style={setAnswerStyles(answer.clicked, answer.isCorrect, graded)}
    //                         >
    //                         {answer.data}
    //                     </li>)}) 
    //                 }
    //             </ul>
    //         </div>
    //         )
    //         return temp
    //     })
    // }

      // function setAnswerStyles(clicked, correct, graded){
    //     const defaultStyles = {color: "black"}
    //     if(graded) {

                        
    //         if (clicked&&correct) {
    //             return {...defaultStyles, color:"green"}
    //         }
    //         else if(clicked){
    //             return {...defaultStyles, color: "red"}
    //         }
    //         else if (correct){
    //             return {...defaultStyles, color: "green"}

    //         }
    //         else {
    //             return {...defaultStyles, color: "black"}
    //         }
    //     }
    //     else {
    //         return clicked?{...defaultStyles, color:"purple"}:{...defaultStyles, color:"black"}
    //     }
    // }
