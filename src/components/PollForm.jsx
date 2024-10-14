import PollResult from "./PollResult";
import Timer from "./Timer";

function PollForm({
  question: { question, options },
  answer,
  pollingState,
  setAnswer,
  handleSubmit,
  time,
  setTime
}) {
  return (
    <div className="form-container">
      <header>
        <h1>Question</h1>
        {
          pollingState === "answering" &&
            <Timer
              time={time}
              setTime={setTime}
              handleSubmit={handleSubmit}
            />
        }

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
            <button className="continue" onClick={() => {
                      setTime(60);
                      handleSubmit();
                    }}>
              Submit
            </button>
          </div>
        </>
      ) : (
        <>
          <PollResult question={question} options={options} />
          <div className="pls-wait">
            Wait for the teacher to ask a new question..
          </div>
        </>
      )}
    </div>
  );
}

export default PollForm;
