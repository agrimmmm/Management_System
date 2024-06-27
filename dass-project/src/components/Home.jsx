import React, { useEffect, useState } from "react";
import "./CSS/home.css";
// import e from "express";
import img1 from "./CSS/arka_logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { USER } from "./LoginPage";
// import "./loading.css";
// import { navigate } from "@reach/router";
import { useNavigate } from "react-router-dom";
import { getUser, getRole } from "./LoginPage";

// const USER = localStorage.getItem("USER") || "";
// const ROLE = localStorage.getItem("ROLE") || "";
// console.log(USER);
// const USER = getUser();
// const ROLE = getRole();

// const USER = localStorage.getItem("USER") || "";

export default function Home() {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
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
  // }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <img onClick={handlehomeredirect} src={img1} alt="Cogo" className="logo" />
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
        <Link to="/purchase-page">
          <button className="button button-size purchase-button">
            Make/View Purchases
          </button>
        </Link>
        <span style={{ marginRight: "120px" }}></span>
        <Link to="/drone-testing">
          <button className="button button-size drone-button" img="./CSS/drone.jpg">
            Book a slot for Drone Testing
          </button>
        </Link>
        <span style={{ marginRight: "120px" }}></span>
        <Link to="/leave-page">
          <button className="button button-size leave-button" img="./CSS/drone.jpg">
            Apply/Check Leave
          </button>
        </Link>
        <span style={{ marginRight: "120px" }}></span>
        <Link to="/search">
          <button className="button button-size tool-button" img="./CSS/drone.jpg" >
            Search for tools
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

// export default Home_Page;
