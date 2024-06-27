import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
// import { USER } from "./LoginPage";
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";

export default function TicketTracker() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [selectedProject, setSelectedProject] = useState("");

  

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

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await axios.get("http://localhost:5000/ticket");
        setTickets(response.data.reverse());
        
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }

    fetchTickets();
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
    }, 800);
  };

  const userTickets = tickets.filter((ticket) => ticket.user === USER);

  const handleProjectFilterChange = (event) => {
    setSelectedProject(event.target.value);
  };


  const filteredTickets = selectedProject
  ? userTickets.filter((ticket) => ticket.project === selectedProject)
  : userTickets;

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
          className="py-5 h-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="carde" style={{ borderRadius: 30 }}>
                <div className="purchase-form p-md-5">
                  <h1 className="mb-md-5 heading">TRACK YOUR TICKETS</h1>
                  <div>
                    <label htmlFor="projectFilter">Filter by Project: &nbsp;</label>
                    <select
                      id="projectFilter"
                      value={selectedProject}
                      onChange={handleProjectFilterChange}
                      className="filter-button"
                    >
                      <option value="">All Projects</option>
                      {Array.from(
                        new Set(tickets.map((ticket) => ticket.project))
                      ).map((project) => (
                        <option key={project} value={project}>
                          {project}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />

                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="table-dark">S. No.</th>
                        <th className="table-dark">Entry Date</th>
                        <th className="table-dark">Team</th>
                        <th className="table-dark">Project</th>
                        <th className="table-dark">Slot Date</th>
                        <th className="table-dark">Slot Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket, index) => (
                        <tr key={index}>
                          <td className="table-secondary">{index + 1}</td>
                          <td className="table-secondary">{ticket.date}</td>
                          <td className="table-secondary">{ticket.team}</td>
                          <td className="table-secondary">
                            {ticket.project}
                          </td>
                            <td className="table-secondary">{ticket.slotDate}</td>
                            <td className="table-secondary">{ticket.slotTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
