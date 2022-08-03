import React from "react"
import ReactDOM from "react-dom"
import Quiz from "./components/quiz"
import { nanoid } from 'nanoid'



export default function App() {
//click on button, render another component
    const [styles, setStyles] = React.useState({})
    const [quizzes, setQuiz]= React.useState([])

    function hideOverlay(){
        setStyles({display: "none"})
    }
    function randomAnswers(incorrectAnswers, correctAnswer) {
        const pos = Math.round(Math.random()*3)
        const cp_array=[...incorrectAnswers]
        cp_array.splice(pos,0, correctAnswer)
        return cp_array
    }
    React.useEffect(()=>{
        fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple')
        .then( response=>{
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data=>{
            const quizData = data.results.map(quiz => {return {question: quiz.question, answers: randomAnswers(quiz.incorrect_answers, quiz.correct_answer)}
                
            });
            const rendered_quizzes=quizData.map(quiz=>{return(
                <div key={nanoid()}>
                    <h2>{quiz.question}</h2>
                    <ul>
                        {quiz.answers.map(answer=>(<li key={nanoid()}>{answer}</li>))}
                    </ul>
                </div>

            )})
            setQuiz(rendered_quizzes)

        })
        .catch(e=>console.log("error ", e))
    },[])


    return (
        <div className="main">
            <div style={styles} className="overlay">
                <h1>Quizzical</h1>
                <h6>Some description if needed</h6>
                <button  onClick={hideOverlay}>Start quiz</button>
            </div>
            <div className="mainQuiz">{quizzes}</div>
        </div>
    )
}