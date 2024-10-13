import React, { useState } from "react";
import OptionRow from "../components/OptionRow";
import socket from "../lib/socket";
import PollResult from "../components/PollResult";

const defaultOptions = [
  { value: "option1", correct: false },
  { value: "option2", correct: true },
];

const defaultResponse = {
  question: "",
  options: [],
};

function TeacherPage() {
  const [options, setOptions] = useState(defaultOptions);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(defaultResponse);
  const [pollState, setPollState] = useState("askQuestion");

  function postNewQuestion() {
    socket.connect();

    setPollState("viewResult");

    socket.emit("question", {
      question,
      options,
    });

    socket.on("newQuestion", (response) => {
      console.log("new question asked");
      setResponse({ ...response });
    });

    socket.on("questionStatus", (response) => {
      console.log("new question asked");
      setResponse({ ...response });
    });
  }

  return (
    <div
      className={`container ${
        pollState === "askQuestion" ? "teacher-container" : ""
      }`}
    >
      {pollState === "askQuestion" ? (
        <>
          <div className="que-form">
            <div className="heading">
              <h1>
                Let's <span>Get Started</span>
              </h1>
              <p>
                you'll have the ability to create and manage polls, ask
                questions, and monitor your students' responses in real-time.
              </p>
            </div>
            <div className="question">
              <div className="q-text">
                <span>Enter your question</span>
                <button>60 seconds</button>
              </div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
            <div className="options">
              <div className="o-text">
                <span className="edit-op-head">Edit Options</span>
                <span className="correct-head">Is it Correct?</span>
              </div>
              {options.map((_, index) => {
                return (
                  <OptionRow
                    key={index}
                    options={options}
                    index={index}
                    setOptions={setOptions}
                  />
                );
              })}
            </div>
          </div>
          <div className="ask-que" onClick={postNewQuestion}>
            <div className="continue">Ask Question</div>
          </div>
        </>
      ) : (
        <div className="teacher-res">
          <header>
            <h1>Question</h1>
          </header>
          <PollResult question={response.question} options={response.options} />
          <div className="button-row">
            <button
              className="continue"
              onClick={() => {
                setPollState("askQuestion");
                setQuestion("");
                setOptions(defaultOptions);
                setResponse(defaultResponse);
              }}
            >
              + Ask a new question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherPage;
