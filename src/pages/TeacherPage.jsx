import React, { useState } from "react";
import OptionRow from "../components/OptionRow";
import socket from "../lib/socket";
import PollResult from "../components/PollResult";
import IntervuePollButton from "../components/IntervuePollButton";
import { Link } from "react-router-dom";

const defaultOptions = () => ([
  { value: "option1", correct: false },
  { value: "option2", correct: true },
]);

const defaultResponse = () => ({
  question: "",
  options: [],
});

function TeacherPage() {
  const [options, setOptions] = useState(defaultOptions());
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(defaultResponse());
  const [pollState, setPollState] = useState("askQuestion");
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const [time, setTime] = useState(60);
  const [showDropdown, setShowDropdown] = useState(false);

  function postNewQuestion() {
    socket.connect();

    setPollState("viewResult");

    socket.emit("question", {
      question,
      options,
      time
    });

    socket.on("newQuestion", (response) => {
      setResponse({ ...response });
    });

    socket.on("questionStatus", (response) => {
      setResponse({ ...response });
    });

    socket.on("endQuestion", () => {
      setAskNewQuestion(true);
    })
  }

  function changeTime(time) {
    setTime(time);
    setShowDropdown(false);
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
            <IntervuePollButton />
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
                <div>
                  <span
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {time} seconds
                    <img
                      src="inverted-triangle.svg"
                      width="15"
                      height="15"
                    />
                  </span>
                  {
                    showDropdown && (
                      <ul className="time-dropdown">
                        {[90, 60, 30, 15].map(time => (
                          <li key={time} onClick={() => changeTime(time)}>{time} seconds</li>
                        ))}
                      </ul>
                    )
                  }

                </div>
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
          <div
            className="add-option"
            onClick={() => {
              setOptions([...options, {value: "new option", correct: false}])
            }}
          >
            + Add More option
          </div>
          <div className="ask-que" onClick={postNewQuestion}>
            <div className="continue">Ask Question</div>
          </div>
        </>
      ) : (
        <div className="teacher-res">
          <Link to="/past-results" className="view-past-link">
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1_502)">
                <path d="M15.5 6.125C9.25 6.125 3.9125 10.0125 1.75 15.5C3.9125 20.9875 9.25 24.875 15.5 24.875C21.7563 24.875 27.0875 20.9875 29.25 15.5C27.0875 10.0125 21.7563 6.125 15.5 6.125ZM15.5 21.75C12.05 21.75 9.25 18.95 9.25 15.5C9.25 12.05 12.05 9.25 15.5 9.25C18.95 9.25 21.75 12.05 21.75 15.5C21.75 18.95 18.95 21.75 15.5 21.75ZM15.5 11.75C13.4312 11.75 11.75 13.4313 11.75 15.5C11.75 17.5688 13.4312 19.25 15.5 19.25C17.5688 19.25 19.25 17.5688 19.25 15.5C19.25 13.4313 17.5688 11.75 15.5 11.75Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_1_502">
                  <rect width="30" height="30" fill="white" transform="translate(0.5 0.5)"/>
                </clipPath>
              </defs>
            </svg>
            View Poll History
          </Link>
          <header>
            <h1>Question</h1>
          </header>
          <PollResult question={response.question} options={response.options} />
          <div className="button-row">
            <button
              className="continue"
              onClick={askNewQuestion ? () => {
                setPollState("askQuestion");
                setQuestion("");
                setOptions([...defaultOptions()]);
                setResponse({...defaultResponse()});
              } : undefined}
            >
              {askNewQuestion ? "+ Ask a new question" : "Waiting for answers..."}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherPage;
