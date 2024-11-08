import React from "react";

const Question = ({ questionData, selectedOption, handleSelectOption }) => {

    return (
      <div>
        <h1 className="question">{questionData.question}</h1>
          {questionData.options.map((option, id) => (
            <li key={id}>
              <label>
                <input 
                  type="radio"
                  className="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={()=>handleSelectOption(option)}
                />
                {option}
              </label>
            </li>
          ))}
      </div>
    );
  };
  
  export default Question;