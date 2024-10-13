import PollResult from "./PollResult";

function PollForm({
  question: { question, options },
  answer,
  pollingState,
  setAnswer,
  handleSubmit,
}) {
  console.log(question);
  return (
    <div className="form-container">
      <header>
        <h1>Question</h1>
      </header>

      {pollingState === "answering" ? (
        <>
          <div className="poll-form">
            <span className="poll-question">{question}</span>
            <div className="options-container">
              {options.map((option, index) => {
                return (
                  <div
                    key={index}
                    className={`${index === answer ? "answer-selected" : ""}`}
                    onClick={() => setAnswer(index)}
                  >
                    <span
                      className={`option-index ${
                        index !== answer ? "disabled-index" : ""
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span>{option.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="button-row">
            <button className="continue" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      ) : (
        <PollResult question={question} options={options} />
      )}
    </div>
  );
}

export default PollForm;
