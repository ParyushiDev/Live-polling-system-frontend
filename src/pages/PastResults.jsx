import { useEffect, useState } from "react";
import PollResult from "../components/PollResult";

function PastResults() {
  const [responses, setResponse] = useState([]);

  useEffect(() => {
    async function doFetch() {
      try {
        const res = await fetch('https://live-polling-system-backend.onrender.com/getAll');
        const data = await res.json();
        setResponse(data.reverse());
        console.log(data);
      } catch(e) {
        console.log("failed to fetch past responses", e);
      }
    }
    doFetch();
  }, []);

  return (
    <div className="past-res-container">
      <div className="past-results-col">
        <header className="heading">
          <h1>View <span>Poll History</span></h1>
        </header>
        <div className="past-results">
          {
            responses.map(({ question, options }, index) => (
              <div key={index} className="response-container">
                <h2>Question {index + 1}</h2>
                <PollResult
                  question={question}
                  options={options}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default PastResults;
