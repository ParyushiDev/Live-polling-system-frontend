import React from "react";

function PollResult({ question, options }) {
  console.log(options);
  const totalVotes = options.reduce((acc, { count }) => acc + count, 0);

  return (
    <div className="poll-form">
      <span className="poll-question">{question}</span>
      <div className="result-options-container">
        {options.map((option, index) => {
          return (
            <div key={index} className="result-option-row">
              <div
                className="progress"
                style={{
                  width: `${
                    (totalVotes > 0 ? option.count / totalVotes : 0) * 100
                  }%`,
                }}
              ></div>
              <div className="result-option-val">
                <span className="option-index">{index + 1}</span>
                <span>{option.value}</span>
              </div>
              <div className="select-percent">
                {((totalVotes > 0 ? option.count / totalVotes : 0) * 100)
                  .toString()
                  .substring(0, 4)}{" "}
                %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PollResult;
