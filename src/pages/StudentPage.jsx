import { useEffect, useState } from "react";
import StudentLogInForm from "../components/StudentLogInForm";
import socket from "../lib/socket";
import Waiting from "../components/Waiting";
import PollForm from "../components/PollForm";
import IntervuePollButton from "../components/IntervuePollButton";

function StudentPage() {
  const [name, setName] = useState("");
  const [pollingState, setPollingState] = useState(
    sessionStorage.getItem("state") ?? "login"
  );
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState(-1);
  const [time, setTime] = useState(60);

  function handleLogInSubmit(e) {
    e.preventDefault();
    socket.connect();
    socket.emit("newStudent", name);
    sessionStorage.setItem("state", "waiting");
    sessionStorage.setItem("name", name);
    setPollingState("waiting");

    socket.on("newQuestion", (question) => {
      console.log(question);
      setPollingState("answering");
      setQuestion(question);
      setTime(question.time);
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

  useEffect(() => {
    if (pollingState !== "waiting") {
      return;
    }
    socket.connect();

    socket.emit("newStudent", sessionStorage.getItem("name"))
    socket.on("newQuestion", (question) => {
      setPollingState("answering");
      setQuestion(question);
    });
    
    return () => socket.disconnect();
  }, [])

  return (
    <div className="container">

      {pollingState === "login" ? (
        <>
          <IntervuePollButton />
          <StudentLogInForm
            name={name}
            setName={setName}
            onSubmit={handleLogInSubmit}
          />
        </>
      ) : pollingState === "waiting" ? (
        <>
          <IntervuePollButton />
          <Waiting />
        </>
      ) : (
        <PollForm
          pollingState={pollingState}
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          handleSubmit={handleAnswerSubmit}
          time={time}
          setTime={setTime}
        />
      )}
    </div>
  );
}

export default StudentPage;
