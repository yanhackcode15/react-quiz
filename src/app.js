import React, { useCallback } from "react"
import Overlay from "./components/overlay"
import {QuizContainer} from "./components/quizContainer"

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
    // const dummyQuizzes=[1,2,3,4,5,6,7,8,9,10].map(num=>({question:num,answers:[]}))
    const [quizzes, setQuiz]= React.useState([])
    //quizzes = [ ...{ question: "", answers: [ ...{data:"" , isCorrect: true/flase, clicked: true/false}]}]
    const [graded, setGraded] = React.useState(false)

    const hideOverlay = React.useCallback(()=>{
        setOverlayStyles(defaultStyles=>({...defaultStyles, display: "none", zIndex: "-1"}))
        setQuizzesStyles(defaultStyles=>({...defaultStyles, zIndex: "1", display: "flex"}))

    },[]) 
    function randomSort(incorrectAnswers, correctAnswer) {
        //randomly sort answers and add two attributes to each answer: clicked, isCorrect
        const pos = Math.round(Math.random()*3)
        const cp_array=[...incorrectAnswers].map(i=>({data:i, isCorrect: false, clicked: false}))
        cp_array.splice(pos,0, {data:correctAnswer, isCorrect: true, clicked: false})
        return cp_array
    }

    const gradeQuiz = React.useCallback(() => {
        //will iterate through the entire quiz array, compare answer.clicked clicked and answer.isCorrect, if match, show answer green; otherwise, show answer red and correct anwer green
        setGraded(true)
    },[]);

    const restartQuiz = React.useCallback(() => {
        setGraded(false)
        //reset all answers to be none clicked
        setQuiz(prev=>
            prev.map((quiz,i)=>{
                const answers = quiz.answers.map(answer=>({...answer, clicked: false}))
                const newQuiz ={...quiz, answers: answers}
                return newQuiz
            })
        )
    },[]);

    const refreshQuiz = React.useCallback(() => {
        setGraded(false)
        fetchQuiz()
    },[]);

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

    function fetchQuiz() {
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
    }
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
        fetchQuiz()
    },[])


    return (
        <div className="main">
            <Overlay 
                overlayStyles={overlayStyles}
                hideOverlay={hideOverlay}
            />
            
            <QuizContainer
                quizzesStyles={quizzesStyles}
                quizzes={quizzes}
                graded={graded}
                gradeQuiz={gradeQuiz}
                restartQuiz={restartQuiz}
                refreshQuiz={refreshQuiz}
                scoring={scoring}
                handleAnswerClick={handleAnswerClick}
             />
        </div>
    )
}

