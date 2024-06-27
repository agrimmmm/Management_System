import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";

export default function ViewAllTicketsPage() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [tickets, setTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    const handleStorageChange = () => {
      setUSER(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const ticketResponse = await axios.get(
          "http://localhost:5000/ticket"
        );
        const tickets = ticketResponse.data.map((ticket) => ({
          ...ticket,
        }));
        setTickets(tickets.reverse());
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
    localStorage.removeItem("USER");
    localStorage.removeItem("ROLE");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

//   const handleRowDoubleClick = (ticket) => {
//     if (selectedTickets.some((p) => p._id === purchase._id)) {
//       setSelectedTickets(
//         selectedTickets.filter((p) => p._id !== purchase._id)
//       );
//       setEditableFields((prevFields) => {
//         const updatedFields = { ...prevFields };
//         delete updatedFields[purchase._id];
//         return updatedFields;
//       });
//     } else {
//       setSelectedPurchases([...selectedPurchases, purchase]);
//       setEditableFields((prevFields) => ({
//         ...prevFields,
//         [purchase._id]: {
//           orderNo: purchase.orderNo,
//           approval: purchase.approval,
//           arrival: purchase.arrival,
//           billNo: purchase.billNo,
//           trackingNo: purchase.trackingNo,
//           description: purchase.description,
//           grossamount: purchase.grossamount,
//           netamount: purchase.netamount,
//           paidby: purchase.paidby,
//           recipient: purchase.recipient,
//           datepayment: purchase.datepayment,
//         },
//       }));
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTickets = await Promise.all(
        selectedTickets.map(async (ticket) => {
          const response = await axios.put(
            `http://localhost:5000/ticket/${ticket._id}`,
            editableFields[ticket._id]
          );
          return { ...ticket, ...response.data };
        })
      );
      setTickets(
        tickets.map(
          (ticket) =>
            updatedTickets.find((p) => p._id === ticket._id) || ticket
        )
      );
      setSelectedTickets([]);
      setEditableFields({});
    } catch (error) {
      console.error("Error updating tickets:", error);
    }
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
          className="py-5 h-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="carde" style={{ borderRadius: 30 }}>
                <div className="purchase-form p-md-5">
                  <h1 className="mb-md-5 heading">VIEW ALL RAISED TICKETS</h1>
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
                      {tickets.map((ticket, index) => (
                        <tr
                          key={index}
                        //   onDoubleClick={() => handleRowDoubleClick(ticket)}
                          className={
                            selectedTickets.some(
                              (p) => p._id === ticket._id
                            )
                              ? "selected-row"
                              : ""
                          }
                        >
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
                  <br />
                  {selectedTickets.length > 0 && (
                    <div className="edit-form">
                      <button type="submit" onClick={handleSubmit} className="filter-button">
                        Save
                      </button>
                    </div>
                  )}
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
