import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
// import { USER } from "./LoginPage";
import { getUser } from "./LoginPage";

const getCurrDate = () => {
  let currDate = new Date();
  const year = currDate.getFullYear();
  const month = String(currDate.getMonth() + 1).padStart(2, "0");
  const day = String(currDate.getDate()).padStart(2, "0");

  currDate = `${day}-${month}-${year}`;
  return currDate;
};

export default function TicketForm() {
  const [USER, setUSER] = useState(getUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUSER(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    user: USER,
    date: getCurrDate(),
    team:"",
    project:"",
    slotDate:"",
    slotTime:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTicketData((prevTicketData) => ({
        ...prevTicketData,
        [name]: value,
    }));
  };

  const projects = [
    "Charmender",
    "Pikachu",
    "Starling",
    "DTRS",
    "Generic",
    "MFG",
  ];

  const teams = [
    "Embedded",
    "Mechanical",
    "Firmware",
    "Robotics",
    "AI",
    "Management",
    "Founder's Office",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

      await axios.post("http://localhost:5000/ticket", ticketData);
      navigate("/home"); // Redirect to a success page
      alert("Form submitted successfully");
  };

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
    }, 800);
  };

  return (
    <>
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
          className="container py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="align-center-dif">
            <div className="">
              <div className="card card-old" style={{ borderRadius: 30 }}>
                <div className="purchase-form p-md-5">
                  <h1 className="mb-md-5 heading">RAISE A TICKET</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="team">
                            Team <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="team"
                            name="team"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px", height: "30px" }}
                            value={ticketData.team}
                            onChange={handleChange}
                            required
                          >
                            <option value="" className="dropdown-option" disabled>
                              Select team
                            </option>
                            {teams.map((team, index) => (
                              <option
                                key={index}
                                value={team}
                                className="dropdown-option"
                              >
                                {team}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="project">
                            Project <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="project"
                            name="project"
                            className="form-control form-control-lg-lg"
                            style={{ width: "600px", height: "30px" }}
                            value={ticketData.project}
                            onChange={handleChange}
                            required
                          >
                            <option value="" className="dropdown-option" disabled>
                              Select Project
                            </option>
                            {projects.map((project, index) => (
                              <option
                                key={index}
                                value={project}
                                className="dropdown-option"
                              >
                                {project}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                            <label className="form-label" htmlFor="linkToPurchase">
                                Choose Slot Date <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="date"
                                id="slotDate"
                                name="slotDate"
                                className="form-control form-control-lg-lg"
                                value={ticketData.slotDate}
                                onChange={handleChange}
                                required
                                style={{ width: "600px" }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                            <label className="form-label" htmlFor="linkToPurchase">
                                Choose Slot Time <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="time"
                                id="slotTime"
                                name="slotTime"
                                className="form-control form-control-lg-lg"
                                value={ticketData.slotTime}
                                onChange={handleChange}
                                required
                                style={{ width: "600px" }}
                            />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-color">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <main className="main-content">
          <br />
          <footer className="about">
            Copyright © 2024 Arka Aerospace - All Rights Reserved.
          </footer>
        </main>
      </div>
    </>
  );
}
