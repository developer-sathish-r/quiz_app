import React, { useState } from "react";
import data from "./data/data";
import './App.css';
import Question from "./components/question";
import Result from "./components/result";
import { Col, Row } from "antd";
import ProgressBar from 'react-bootstrap/ProgressBar';

function App() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [mark, setMark] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(90)
  const [randomQuestions] = useState(GenerateRandomQuestions());
   
  //Preview-btn
  const handlePreview = () => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
      setProgress(progress + 10)
      const previousAnswer = userAnswers[questionNumber - 1];
      setSelectedOption(previousAnswer ? previousAnswer.selectedAnswer : null)
    }
  };

  //Next-btn
  const handleNext = () => {
    if (selectedOption === null) {
      setErrorMessage("Select any one option");
      return;
    }

    setErrorMessage("");
    const currentQuestion = randomQuestions[questionNumber];
    const correctAnswer = (selectedOption === currentQuestion.answer);

    const displayData = {
      question: currentQuestion.question,
      options: currentQuestion.options,
      answer: currentQuestion.answer,
      selectedAnswer: selectedOption,
      correctAnswer,
    };

    //Total Mark score
    if (correctAnswer) {
      setMark(mark + 1);
    }

    const updatedAnswers = [...userAnswers];
    console.log("updatedAnswer", updatedAnswers)
    updatedAnswers[questionNumber] = displayData;
    console.log("updatedAnswers[questionNumber]", updatedAnswers[questionNumber])
    setUserAnswers(updatedAnswers);
    setSelectedOption(null);

    //Track questions
    if (questionNumber + 1 < randomQuestions.length) {
      setQuestionNumber(questionNumber + 1);
      setProgress(progress - 10)
    } else {
      setShowResult(true);
    }
  };

  //Selected option
  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  //Randomly generate questions 
  function GenerateRandomQuestions() {
    const quizQuestions = [...data].sort(() => 0.5 - Math.random());
    return quizQuestions.slice(0, 10);
  }

  return (
    <div >
      {!showResult ? (
        <div className="App">

          <Row justify={"center"}>
            <h2 className="title">Simple Quiz Application</h2>
          </Row>

          <Row justify={"center"}>
            <p className="questionCount" >Question No. {questionNumber + 1} of {randomQuestions.length}</p>
          </Row>

          <Row>
            <Col className="progress">
              <ProgressBar variant="warning" animated now={progress + 10} />
            </Col>
          </Row>


          <Row justify={"center"}>
            <Question
              questionData={randomQuestions[questionNumber]}
              selectedOption={selectedOption}
              handleSelectOption={handleSelectOption}
            />
          </Row>

          <Row justify={"center"}>
            <p className="error-message">{errorMessage}</p>
          </Row>

          <Row justify={"space-evenly"}>
            <div className="button">
              {questionNumber > 0 && (
                <button onClick={handlePreview} className="preview-button">Previous</button>
              )}
              <button
                onClick={handleNext}
                className="next-button">Next</button>
            </div>
          </Row>

        </div>
      )
        :
        (
          <Result tableData={userAnswers} mark={mark} />
        )}

    </div>
  );
}
export default App;
