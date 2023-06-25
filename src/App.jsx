import "./App.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";

function App() {
  const [characterLength, setCharacterLength] = useState(8);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Characters", state: false },
    { title: "Include Lowercase Characters", state: false },
    { title: "Include Numbers", state: true },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  const { password, errorMessage, generatePassword, passwordStrength } =
    usePasswordGenerator();

  return (
    <div className="App">
      <header>
        <h3 className="generated-password">
          {password ? password : "Select options to proceed."}
        </h3>
        <button disabled={!password} className="copy-btn" onClick={handleCopy}>
          {!copied ? "Copy" : "Copied"}
        </button>
      </header>

      <div className="character-length">
        <p>
          <span>Character Length</span>
          <span>{characterLength}</span>
        </p>
        <input
          type="range"
          min="4"
          max="20"
          value={characterLength}
          onChange={(e) => setCharacterLength(e.target.value)}
        />
      </div>
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={"cb_" + index}
              onChange={() => handleCheckboxChange(index)}
              checked={checkbox.state}
            />
            <label htmlFor={"cb_" + index}>{checkbox.title}</label>
          </div>
        ))}
      </div>
      {errorMessage ? (
        <p className="error">{"*" + errorMessage}</p>
      ) : (
        <div className="strength-details">
          <p>
            <span>Strength:</span>
            <span className={passwordStrength}>{"*" + passwordStrength}</span>
          </p>
        </div>
      )}

      <button
        className="btn-generate"
        onClick={() => {
          generatePassword(checkboxData, characterLength);
          setCopied(false);
        }}
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
