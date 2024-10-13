import React from "react";

function StudentLogInForm({ name, setName, onSubmit }) {
  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <>
      <div className="heading student-heading">
        <h1>
          Let's <span>Get Started</span>
        </h1>
        <p>
          If you're a student, you'll be able to{" "}
          <span>submit your answers</span>, participate in the live polls, and
          see how your responses compare with your classmates
        </p>
      </div>
      <form className="details" onSubmit={onSubmit}>
        <label htmlFor="name">
          <span>Enter your Name</span>
          <input
            className="text-input"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleChange}
          />
        </label>

        <button className="continue" type="submit">
          Continue
        </button>
      </form>
    </>
  );
}

export default StudentLogInForm;
