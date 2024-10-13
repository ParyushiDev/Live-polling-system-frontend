import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [link, setLink] = useState(1);

  return (
    <div className="container">
      <div className="heading">
        <h1>
          Welcome to the <span>Live Polling System</span>
        </h1>
        <p>
          Please select the role that describes you to begin using the live
          polling system
        </p>
      </div>

      <div className="link-btns">
        <div
          className={`btn ${link === 1 ? "btn-hover" : ""}`}
          onClick={() => setLink(1)}
        >
          <h2>I'm a Student</h2>
          <p>Submit answers and view live poll results in real-time.</p>
        </div>

        <div
          className={`btn ${link === 2 ? "btn-hover" : ""}`}
          onClick={() => setLink(2)}
        >
          <h2>I'm a Teacher</h2>
          <p>Post questions and view live poll results in real-time.</p>
        </div>
      </div>
      <Link to={link === 1 ? "/student" : "/teacher"}>
        <div className="continue">Continue</div>
      </Link>
    </div>
  );
}

export default Home;
