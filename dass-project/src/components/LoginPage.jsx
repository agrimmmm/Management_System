// import react from 'react';
import loginInfo from "../loginInfo";
import LoginInfo from "./LoginInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/login.css";
import img1 from "./CSS/arka_logo.png";
import lkimg from "./CSS/lock.png";
import usimg from "./CSS/user.png";
import { motion } from "framer-motion";
// import Alert from "@material-ui/lab/Alert";
import { useEffect, useState } from "react";
// import {setUse}
// import { setUSER, setROLE } from "./Home";

import React from "react";

// var USER = "";
// var ROLE = "";
// export let USER = localStorage.getItem("user") || "";
// export let ROLE = localStorage.getItem("role") || "";
let USERNAME = localStorage.getItem("user") || "";
let ROLENAME = localStorage.getItem("role") || "";

export function getUser() {
  return USERNAME;
}

export function getRole() {
  return ROLENAME;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(localStorage.getItem("user") || "");
  const [ROLE, setROLE] = useState(localStorage.getItem("role") || "");
  // const [errorMessages, setErrorMessages] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);

  loginInfo.map((item) => (
    <LoginInfo username={item.username} password={item.password} />
  ));
  useEffect(() => {
    console.log(USER);
  }, [USER]);

  // const errors = {
  //   uname: "invalid username/email",
  //   pass: "invalid password",
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, pass } = event.target.elements;

    axios
      .post("http://localhost:5000/login", {
        email: email.value,
        password: pass.value,
      })
      .then((result) => {
        // console.log(email.value);
        // console.log(pass.value);
        // console.log(result);
        if (result.status === 201) {
          // console.log("hello");
          // USER = result.data.username;
          // ROLE = result.data.role;
          localStorage.setItem("user", result.data.username);
          localStorage.setItem("role", result.data.role);
          setUSER(result.data.username);
          setROLE(result.data.role);
          console.log(USER);
          setTimeout(() => {
            navigate("/home");
          }, 100);
        } else if (result.status === 210) {
          // USER = "";
          alert("Invalid username or password");
        }
      })
      .catch((error) => {
        alert("Invalid username or password");
        // USER = "";
        // localStorage.removeItem("user");
        // localStorage.removeItem("role");
        console.error("Error logging in:", error);
        // Handle error scenarios
      });

    //   const userData = loginInfo.find(
    //     (user) => (user.username === email.value || user.email === email.value),
    //   );

    //   if (userData) {
    //     if (userData.password !== pass.value) {
    //       setErrorMessages({ name: "pass", message: errors.pass });
    //     } else {
    //       setIsSubmitted(true);
    //     }
    //   } else {
    //     setErrorMessages({ name: "email", message: errors.uname });
    //   }
  };

  // const renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );

  const renderForm = (
    <>
      <div className="App">
        <motion.div
          initial={{ y: 250 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.0, duration: 1.0 }}
        >
          <img src={img1} alt="Arka Logo" className="image" />
        </motion.div>

        <motion.div
          className="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          <form onSubmit={handleSubmit} className="form login">
            <div className="form__field">
              <label htmlFor="login__username">
                <img src={usimg} alt="user" className="icon" />
                <span className="hidden">Username / E-mail</span>
              </label>
              <input
                type="text"
                className="form__input"
                placeholder="Username / E-mail"
                name="email"
                style={{ height: "60px" }}
                required
              />
              {/* {renderErrorMessage("uname")} */}
            </div>

            <div className="form__field">
              <label htmlFor="login__password">
                <img src={lkimg} alt="pass" className="icon" />
                <span className="hidden">Password</span>
              </label>
              <input
                type="password"
                className="form__input"
                placeholder="Password"
                name="pass"
                style={{ height: "60px" }}
                required
              />
              {/* {renderErrorMessage("pass")} */}
            </div>
            <div className="form__field">
              <input type="submit" />
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );

  return renderForm;
}

// export { USER };
// export { ROLE };
