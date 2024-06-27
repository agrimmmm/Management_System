import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "./LoginPage";
import "./CSS/leaveapplication.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import img1 from "./CSS/arka_logo.png";
const LeaveApplicationForm = () => {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
  const handlehomeredirect = () => {
    setTimeout(() => {
      navigate("/home");
    }, 100);
  };
  useEffect(() => {
    const handleStorageChange = () => {
      setUSER(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userName = USER; // Replace with the actual user's name
      await axios.post("http://localhost:5000/leave-application", {
        ...formData,
        userName,
      });
      // Reset the form after successful submission
      setFormData({
        startDate: "",
        endDate: "",
        leaveType: "",
        reason: "",
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const forms = document.querySelectorAll(".requires-validation");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []); // Empty dependency array to run the effect only once after initial render

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h1
                  className="mb-md-5 heading"
                  style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  Leave Application Form
                </h1>
                <form
                  className="requires-validation"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="col-md-12 mb-4">
                    <label className="form-label" htmlFor="componentName">
                      Start Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">
                      Start Date field is valid!
                    </div>
                    <div className="invalid-feedback">
                      Start Date field cannot be blank!
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <label className="form-label" htmlFor="componentName">
                      End Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="endDate"
                      placeholder="End Date"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">
                      End Date field is valid!
                    </div>
                    <div className="invalid-feedback">
                      End Date field cannot be blank!
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <label className="form-label" htmlFor="componentName">
                      Leave Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control form-control-lg-lg"
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleChange}
                      required
                    >
                      <option className="dropdown-option" selected disabled value="">
                        Select Leave Type
                      </option>
                      <option className="dropdown-option" value="Sick Leave">Sick Leave</option>
                      <option className="dropdown-option" value="Vacation Leave">Vacation Leave</option>
                      <option className="dropdown-option" value="Personal Leave">Personal Leave</option>
                    </select>
                    <div className="valid-feedback">
                      You selected a leave type!
                    </div>
                    <div className="invalid-feedback">
                      Please select a leave type!
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
                    <label className="form-label" htmlFor="componentName">
                      Reason <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="reason"
                      placeholder="Reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <div className="valid-feedback">Reason field is valid!</div>
                    <div className="invalid-feedback">
                      Reason field cannot be blank!
                    </div>
                  </div>
                  <div className="form-button mt-3">
                    <button
                      id="submit"
                      type="submit"
                      className="btn btn-primary btn-color container"
                    >
                      Submit
                    </button>
                  </div>
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
  );
};

export default LeaveApplicationForm;
