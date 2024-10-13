import React, { useState } from "react";
import StudentLogInForm from "../components/StudentLogInForm";
import socket from "../lib/socket";
import Waiting from "../components/Waiting";
import PollForm from "../components/PollForm";

function StudentPage() {
  const [name, setName] = useState("");
  const [pollingState, setPollingState] = useState(
    sessionStorage.getItem("state") ?? "login"
  );
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState(-1);

  function handleLogInSubmit(e) {
    e.preventDefault();
    socket.connect();
    socket.emit("newStudent", name);
    sessionStorage.setItem("state", "waiting");
    setPollingState("waiting");

    socket.on("newQuestion", (question) => {
      setPollingState("answering");
      setQuestion(question);
    });
  }

  function handleAnswerSubmit() {
    if (socket.connected) {
      socket.emit("answer", answer);
      setPollingState("answered");
      setAnswer(-1);

      socket.on("questionStatus", (question) => {
        setQuestion({ ...question });
      });
    } else {
      alert("socket not connected");
    }
  }

  return (
    <div className="container">
      {pollingState === "login" ? (
        <StudentLogInForm
          name={name}
          setName={setName}
          onSubmit={handleLogInSubmit}
        />
      ) : pollingState === "waiting" ? (
        <Waiting />
      ) : (
        <PollForm
          pollingState={pollingState}
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          handleSubmit={handleAnswerSubmit}
        />
      )}
    </div>
  );
}

export default StudentPage;
