import React from "react";
import { BsCheck2Circle } from "react-icons/bs";

const Result = ({ tableData, mark }) => {
  return (
    <div >
      <p className="result-icon"><BsCheck2Circle /></p>
      <h2 className="result-title">Your Answer's Submitted</h2>
      <h3 className="marks">Total Marks- {mark} </h3>

      <table className="result" border={"solid black"}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Question</th>
            <th>Total options</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((answer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{answer.question}</td>
              <td >
                {answer.options.map((option, id) => (
                  <div className="tableOption" key={id}>{option}</div>
                ))}
              </td>
              <td
                style={{
                  backgroundColor: answer.correctAnswer ? "green" : "#dc3545",
                  color: answer.correctAnswer ? "white" : "white",
                }}
              >
                {answer.selectedAnswer}
              </td>
              <td>{answer.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
