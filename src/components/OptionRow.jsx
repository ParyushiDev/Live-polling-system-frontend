import React from "react";

function OptionRow({ options, index, setOptions }) {
  function handleValueChange(event) {
    options[index].value = event.target.value;
    setOptions([...options]);
  }
  function handleCorrectChange(newValue) {
    options[index].correct = newValue;
    setOptions([...options]);
  }

  return (
    <div className="option-row">
      <label className="option-value">
        <span className="option-index">{index + 1}</span>
        <input
          className="text-input"
          value={options[index].value}
          onChange={handleValueChange}
        />
      </label>
      <div>
        <label className="option-correct">
          <input
            type="radio"
            value={options[index].correct}
            onClick={() => handleCorrectChange(true)}
            name={`correct-${index}`}
          />
          <span>Yes</span>
        </label>
        <label className="option-correct">
          <input
            type="radio"
            value={!options[index].correct}
            onClick={() => handleCorrectChange(false)}
            name={`correct-${index}`}
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
}

export default OptionRow;
