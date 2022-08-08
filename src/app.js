import React, { useCallback } from "react"
import ReactDOM from "react-dom"
// import { nanoid } from 'nanoid'
import Quiz from "./components/quiz"
import blueBlob from "./images/blueBlob.png"
import yellowBlob from "./images/yellowBlob.png"

export default function App() {
//click on button, render another component
    const overlayDefaultStyles = {
        backgroundColor: "white",
        zIndex: "0"
    }
    const quizzesDefaultStyles={
        // zIndex: "-1"
        display: "none"
    }
    const [overlayStyles, setOverlayStyles] = React.useState(overlayDefaultStyles)
    const [quizzesStyles, setQuizzesStyles] = React.useState(quizzesDefaultStyles)
    const [quizzes, setQuiz]= React.useState([])
    //quizzes = [ ...{ question: "", answers: [ ...{data:"" , isCorrect: true/flase, clicked: true/false}]}]
    const [graded, setGraded] = React.useState(false)
    const [refreshQuiz, setRefreshQuiz] = React.useState(true)


    function hideOverlay(){
        setOverlayStyles(defaultStyles=>({...defaultStyles, display: "none", zIndex: "-1"}))
        setQuizzesStyles(defaultStyles=>({...defaultStyles, zIndex: "1", display: "flex"}))
    }
    function randomSort(incorrectAnswers, correctAnswer) {
        //randomly sort answers and add two attributes to each answer: clicked, isCorrect
        const pos = Math.round(Math.random()*3)
        const cp_array=[...incorrectAnswers].map(i=>({data:i, isCorrect: false, clicked: false}))
        cp_array.splice(pos,0, {data:correctAnswer, isCorrect: true, clicked: false})
        return cp_array
    }

    function gradeQuiz(){
        //will iterate through the entire quiz array, compare answer.clicked clicked and answer.isCorrect, if match, show answer green; otherwise, show answer red and correct anwer green
        setGraded(true)
    }

    function restartQuiz(){
        setGraded(false)
        //reset all answers to be none clicked
        setQuiz(prev=>
            prev.map((quiz,i)=>{
                const answers = quiz.answers.map(answer=>({...answer, clicked: false}))
                const newQuiz ={...quiz, answers: answers}
                return newQuiz
            })
        )
    }

    const handleAnswerClick = React.useCallback(
        // function answerChosen(quiz_index, answer_index){
        (quiz_index, answer_index) => {
            // if (graded){
            //     return null
            // }
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

                return newState;
            })
        }, [setQuiz, graded]);

    function scoring() {
        return quizzes.reduce((sum, quiz)=>{
            if (quiz.answers.findIndex(answer=>answer.isCorrect)===quiz.answers.findIndex(answer=>answer.clicked)){
                sum++
            }
            return sum
        },0)
        // return 0
    }
    React.useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple&encode=url3986')
        .then( response=>{
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data=>{
            const quizData = data.results.map(quiz => {
                try {
                    return {
                        question: decodeURIComponent(quiz.question),
                        answers: randomSort(
                            quiz.incorrect_answers.map(answer => decodeURIComponent(answer)),
                            decodeURIComponent(quiz.correct_answer)
                        ),
                    }
                }
                catch(err) {
                    console.log('ERROR', {quiz, err});
                }
                //[...{question: "", answers: [...{data:"" , isCorrect: true/flase, clicked: true/false}]}]
            });
            setQuiz(quizData)
        })
        .catch(e=>console.log("error ", e))
    },[refreshQuiz])


    return (
        <div className="main">
            <div style={overlayStyles} className="overlay layout">
                <div >
                    
                    <h1 className="overLayTitle">Quizzical</h1>
                    <h6 className="overLayText">Some description if needed</h6>
                    <button onClick={hideOverlay} className="overlayButton">Start quiz</button>
                </div>
                <img src={blueBlob} className="blueBlob"/>
                <img src={yellowBlob} className="yellowBlob"/>
            </div>
            <div style={quizzesStyles} className="mainQuiz layout">
                
                <div>
                    {quizzes.map((quiz, i)=>(<Quiz quiz={quiz} index={i} graded={graded} onClickAnswer={handleAnswerClick}/>))}
                </div>
                <div className="center">
                    <button className="checkAnswers" style={!graded?{}:{display: "none"}} onClick={gradeQuiz}>Check Answers</button>

                    <div  className="scoreSection" style={!graded?{display: "none"}:{}}>
                        <h4 className="scoreText">You have {graded&&scoring()} out of {quizzes.length} correct answers!</h4>
                        <button className="retakeQuizButton" onClick={restartQuiz}>Retake Quiz</button>
                        <button className="newQuizButton" onClick={()=>{
                            setRefreshQuiz(prev=>!prev)
                            setGraded(false)
                        }}>Get New Quiz</button>
                    </div>
                </div>
                <img src={blueBlob} className="blueBlob"/>
                <img src={yellowBlob} className="yellowBlob"/>
            </div>
            

            
        </div>
    )
}

