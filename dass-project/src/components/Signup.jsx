import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password",
  };
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uname, pass, email } = event.target.elements;
    axios
      .post("http://localhost:5000/register", {
        name: uname.value,
        email: email.value,
        password: pass.value,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(uname.value);
    console.log(password.value);
    console.log(email.value);

    // Your signup logic can be added here.
    // For simplicity, just setting isSubmitted to true in this example.
    setIsSubmitted(true);

    // Clear error messages
    setErrorMessages({});
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            name="uname"
            onChange={(e) => setName(e.target.value)}
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            name="pass"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* You can add validation for email if needed */}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="signup-form">
        <div className="title">
          {isSubmitted ? (
            <div>Signup successful</div>
          ) : (
            <React.Fragment>{renderForm}</React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
