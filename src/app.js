import React, { useCallback } from "react"
import ReactDOM from "react-dom"
// import { nanoid } from 'nanoid'
import Quiz from "./components/quiz"

// (x) render each answer array with color flags when check answer state is true 
//finish the check answers button toggle to retake quiz, finish logic
// retake quiz will refetch api, consider updating useEffect? or driven by a button click?



export default function App() {
//click on button, render another component
    const overlayDefaultStyles = {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "0"
    }
    const quizzesDefaultStyles={
        zIndex: "-1"
    }
    const [overlayStyles, setOverlayStyles] = React.useState(overlayDefaultStyles)
    const [quizzesStyles, setQuizzesStyles] = React.useState(quizzesDefaultStyles)
    const [quizzes, setQuiz]= React.useState([])
    //quizzes = [ ...{ question: "", answers: [ ...{data:"" , isCorrect: true/flase, clicked: true/false}]}]
    const [graded, setGraded] = React.useState(false)


    function hideOverlay(){
        setOverlayStyles(defaultStyles=>({...defaultStyles, display: "none", zIndex: "-1"}))
        setQuizzesStyles(defaultStyles=>({...defaultStyles, zIndex: "1"}))
    }
    function randomSort(incorrectAnswers, correctAnswer) {
        //randomly sort answers and add two attributes to each answer: clicked, isCorrect
        const pos = Math.round(Math.random()*3)
        const cp_array=[...incorrectAnswers].map(i=>({data:i, isCorrect: false, clicked: false}))
        cp_array.splice(pos,0, {data:correctAnswer, isCorrect: true, clicked: false})
        return cp_array
    }

    function toggleButton(){
        //will iterate through the entire quiz array, compare answer.clicked clicked and answer.isCorrect, if match, show answer green; otherwise, show answer red and correct anwer green
        setGraded(prev=>!prev)
        
    }
    const handleAnswerClick = React.useCallback(
        // function answerChosen(quiz_index, answer_index){
        (quiz_index, answer_index) => {
            //the answer with that answer index for the quiz with that index is clicked and change the answer to green
            //go to i, j in the quiz array and answer , match found, toggle the clicked property

            setQuiz(prevQuizzes=>{
                const newState = [...prevQuizzes];
               //set all answers to clicked: false
                const answers = newState[quiz_index].answers.map((a)=>({...a, clicked: false}))
                newState[quiz_index].answers = answers;
                
                //set new answer to be clicked: true
                const answer = {
                    ...newState[quiz_index].answers[answer_index]
                };
                answer.clicked = !answer.clicked;
                newState[quiz_index].answers[answer_index] = answer;
                console.log(newState[quiz_index])

                return newState;
            })
        }, [setQuiz]);

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

    React.useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple')
        .then( response=>{
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data=>{
            const quizData = data.results.map(quiz => {return {question: quiz.question, answers: randomSort(quiz.incorrect_answers, quiz.correct_answer)}
                //[...{question: "", answers: [...{data:"" , isCorrect: true/flase, clicked: true/false}]}]
            });
            setQuiz(quizData)

        })
        .catch(e=>console.log("error ", e))
    },[])


    return (
        <div className="main">
            <div style={overlayStyles} className="overlay">
                <h1>Quizzical</h1>
                <h6>Some description if needed</h6>
                <button  onClick={hideOverlay}>Start quiz</button>
            </div>
            <div className="mainQuiz" style={quizzesStyles}>
                {quizzes.map((quiz, i)=>(<Quiz quiz={quiz} index={i} graded={graded} onClickAnswer={handleAnswerClick}/>))}
                <button onClick={toggleButton}>{!graded? "Check answers": "How did you do? Restart quiz"}</button>
            </div>
            
        </div>
    )
}

