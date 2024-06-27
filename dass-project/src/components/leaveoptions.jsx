
import React from "react";
import "./CSS/home.css";
import img1 from "./CSS/arka_logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getUser, getRole } from "./LoginPage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function LeaveOptions() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [ROLE, setROLE] = useState(getRole());

  // Update USER and ROLE whenever localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUSER(getUser());
      setROLE(getRole());
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handlehomeredirect = () => {
    setTimeout(() => {
      navigate("/home");
    }, 100);
  };

  const handleLogout = () => {
    // setUSER(""); // Update the state to an empty string
    // setROLE("");
    // Remove USER from localStorage

    localStorage.removeItem("USER");
    localStorage.removeItem("ROLE");

    // Redirect to login page
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  if (ROLE === "manager") {
    return (
      <div className="App">
        <header className="header">
        <div onClick={handlehomeredirect} className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
        </div>
        <div className="header-right">
          Hello, {USER}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
        <motion.div
          className="main-body"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          exit={{ y: window.innerHeight, transition: { duration: 0.5 } }}
        >
          <Link to="/leaveapplication">
            <button className="button leave-form-button">
             Apply for leave
            </button>
          </Link>
          <span style={{ marginRight: "300px" }}></span>
          <Link to="/viewallleaves">
            <button className="button view-leaves" img="./CSS/drone.jpg">
              View all leaves
            </button>
            </Link>
        </motion.div>
        <main className="main-content">
          <br />
          <footer className="about">
            Copyright © 2024 Arka Aerospace - All Rights Reserved.
          </footer>
        </main>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="header">
          <div onClick={handlehomeredirect} className="header-left">
            <img src={img1} alt="Cogo" className="logo" />
          </div>
          <div className="header-right">Hello, {USER}</div>
        </header>
        <motion.div
          className="main-body"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          exit={{ y: window.innerHeight, transition: { duration: 0.5 } }}
        >
          <Link to="/leaveapplication">
            <button className="button leave-form-button">
             Apply for leave
            </button>
          </Link>
          <span style={{ marginRight: "300px" }}></span>
          <Link to="/viewyourleaves">
            <button className="button view-leaves" img="./CSS/drone.jpg">
              View your leaves
            </button>
          </Link>
        </motion.div>
        <main className="main-content">
          <br />
          <footer className="about">
            Copyright © 2024 Arka Aerospace - All Rights Reserved.
          </footer>
        </main>
      </div>
    );
  }
}