import React from "react"
import Quiz from "./quiz"
import yellowBlob from "../images/yellowBlob.png"
import blueBlob from "../images/blueBlob.png"

export const QuizContainer = ({
    quizzesStyles,
    quizzes,
    graded,
    gradeQuiz,
    restartQuiz,
    refreshQuiz,
    scoring,
    handleAnswerClick,
}) => (
    <div style={quizzesStyles} className="mainQuiz layout fade-in" key={quizzes?.[0]?.question ?? "key"}>
        <div>
            {quizzes.map((quiz, i)=>(<Quiz quiz={quiz} index={i} graded={graded} onClickAnswer={handleAnswerClick}/>))}
        </div>
        <div className="center">
            <button className="checkAnswers" style={!graded?{}:{display: "none"}} onClick={gradeQuiz}>Check Answers</button>

            <div  className="scoreSection" style={!graded?{display: "none"}:{}}>
                <h4 className="scoreText">You have {graded&&scoring()} out of {quizzes.length} correct answers!</h4>
                <button className="retakeQuizButton" onClick={restartQuiz}>Retake Quiz</button>
                <button className="newQuizButton" onClick={refreshQuiz}>Get New Quiz</button>
            </div>
        </div>
        <img src={blueBlob} className="blueBlob"/>
        <img src={yellowBlob} className="yellowBlob"/>
    </div>
);

