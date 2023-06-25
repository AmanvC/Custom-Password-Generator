import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const generatePassword = (checkboxData, length) => {
    let charSet = "",
      generatedPassword = "";
    const selectedOptions = checkboxData.filter((cb) => cb.state);

    if (!selectedOptions.length) {
      setErrorMessage("Select atleast one checkbox.");
      setPassword("");
      setPasswordStrength("");
      return;
    }

    selectedOptions.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Characters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Characters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charSet += "0123456789";
          break;
        case "Include Symbols":
          charSet += "!@#$%^&*";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < length; i++) {
      const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
      generatedPassword += randomChar;
    }
    setPassword(generatedPassword);
    setErrorMessage("");
    let ps;
    const variable = (selectedOptions.length * length * 100) / 80; // 80 is 4 * 20 max points
    if (variable <= 33) {
      ps = "Weak";
    } else if (variable <= 66) {
      ps = "Medium";
    } else {
      ps = "Strong";
    }
    setPasswordStrength(ps);
  };

  return { password, errorMessage, generatePassword, passwordStrength };
};

export default usePasswordGenerator;
