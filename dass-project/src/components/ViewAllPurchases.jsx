import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";
import img1 from "./CSS/arka_logo.png";
import { motion } from "framer-motion";
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";

export default function ViewAllPurchasePage() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchases, setSelectedPurchases] = useState([]);
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
    async function fetchPurchases() {
      try {
        const purchaseResponse = await axios.get(
          "http://localhost:5000/purchase"
        );
        const purchases = purchaseResponse.data.map((purchase) => ({
          ...purchase,
          file: purchase.pdfDetails?.pdf || null,
        }));
        setPurchases(purchases.reverse());
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }
    fetchPurchases();
  }, []);

  const showPdf = (pdfFileName) => {
    if (pdfFileName) {
      window.open(
        `http://localhost:5000/files/${pdfFileName}`,
        "_blank",
        "noreferrer"
      );
    }
  };

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

  const handleRowDoubleClick = (purchase) => {
    if (selectedPurchases.some((p) => p._id === purchase._id)) {
      setSelectedPurchases(
        selectedPurchases.filter((p) => p._id !== purchase._id)
      );
      setEditableFields((prevFields) => {
        const updatedFields = { ...prevFields };
        delete updatedFields[purchase._id];
        return updatedFields;
      });
    } else {
      setSelectedPurchases([...selectedPurchases, purchase]);
      setEditableFields((prevFields) => ({
        ...prevFields,
        [purchase._id]: {
          orderNo: purchase.orderNo,
          approval: purchase.approval,
          arrival: purchase.arrival,
          billNo: purchase.billNo,
          trackingNo: purchase.trackingNo,
          description: purchase.description,
          grossamount: purchase.grossamount,
          netamount: purchase.netamount,
          paidby: purchase.paidby,
          recipient: purchase.recipient,
          datepayment: purchase.datepayment,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPurchases = await Promise.all(
        selectedPurchases.map(async (purchase) => {
          const response = await axios.put(
            `http://localhost:5000/purchase/${purchase._id}`,
            editableFields[purchase._id]
          );
          return { ...purchase, ...response.data };
        })
      );
      setPurchases(
        purchases.map(
          (purchase) =>
            updatedPurchases.find((p) => p._id === purchase._id) || purchase
        )
      );
      setSelectedPurchases([]);
      setEditableFields({});
    } catch (error) {
      console.error("Error updating purchases:", error);
    }
  };

  const handleLinkBtn = (link) => {
    window.open(link, "_blank");
  };

  const sendmail = async (componentName, user, email) => {
    try {
      console.log(componentName, user, email)
      await axios.post("http://localhost:5000/sendmail", {
        componentName,
        user,
        email,
      });
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  }

  return (
    <>
      <div className="App">
        <header className="headerx">
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
              <div className="cardx" style={{ borderRadius: 30 }}>
                <div className="purchase-form p-md-5">
                  <h1 className="mb-md-5 heading">VIEW ALL PURCHASES</h1>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="table-dark">S. No.</th>
                        <th className="table-dark">Entry Date</th>
                        <th className="table-dark">Team</th>
                        <th
                          className="table-dark fixed-column"
                          style={{ minWidth: 129 }}
                        >
                          Link to Purchase
                        </th>
                        <th className="table-dark">Component Name</th>
                        <th className="table-dark">Quantity</th>
                        <th className="table-dark">Project</th>
                        <th className="table-dark">CHIMS File</th>
                        <th className="table-dark">PO/BOM/Quote File</th>
                        <th className="table-dark">Order No</th>
                        <th className="table-dark">Approval</th>
                        <th className="table-dark">Arrival</th>
                        <th className="table-dark">Bill No</th>
                        <th className="table-dark">Tracking No</th>
                        <th className="table-dark">Description</th>
                        <th className="table-dark">Gross Amount</th>
                        <th className="table-dark">Net Amount</th>
                        <th className="table-dark">Paid By</th>
                        <th className="table-dark">Recipient</th>
                        <th className="table-dark">Date of Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase, index) => (
                        <tr
                          key={index}
                          onDoubleClick={() => handleRowDoubleClick(purchase)}
                          className={
                            selectedPurchases.some(
                              (p) => p._id === purchase._id
                            )
                              ? "selected-row"
                              : ""
                          }
                        >
                          <td className="table-secondary">{index + 1}</td>
                          <td className="table-secondary">{purchase.date}</td>
                          <td className="table-secondary">{purchase.team}</td>
                          <td className="table-secondary fixed-column">
                            <button
                              onClick={() =>
                                handleLinkBtn(purchase.linkToPurchase)
                              }
                              className="btn btn-primary file-btn"
                            >
                              Open Link
                            </button>
                          </td>
                          <td className="table-secondary">
                            {purchase.componentName}
                          </td>
                          <td className="table-secondary">
                            {purchase.quantity}
                          </td>
                          <td className="table-secondary">
                            {purchase.project}
                          </td>
                          <td className="table-secondary">
                            <button
                              onClick={() => showPdf(purchase.pdfDetails?.cpdf)}
                              className="btn btn-primary file-btn"
                            >
                              {purchase.chimsFile}
                            </button>
                          </td>
                          <td className="table-secondary">
                            <button
                              onClick={() => showPdf(purchase.pdfDetails?.qpdf)}
                              className="btn btn-primary file-btn"
                            >
                              {purchase.quoteFile}
                            </button>
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.orderNo ||
                                  purchase.orderNo
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      orderNo: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.orderNo
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.approval ||
                                  purchase.approval
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      approval: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.approval
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.arrival ||
                                  purchase.arrival
                                }
                                onChange={(e) => {
                                  const newValue = e.target.value;
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      arrival: newValue,
                                    },
                                  }));
                                  if (newValue === "Yes") {
                                    sendmail(purchase.componentName, purchase.user, purchase.email);
                                  }
                                }}
                              />
                            ) : (
                              purchase.arrival
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.billNo ||
                                  purchase.billNo
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      billNo: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.billNo
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.trackingNo ||
                                  purchase.trackingNo
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      trackingNo: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.trackingNo
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.description ||
                                  purchase.description
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      description: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.description
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.grossamount ||
                                  purchase.grossamount
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      grossamount: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.grossamount
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.netamount ||
                                  purchase.netamount
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      netamount: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.netamount
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.paidby ||
                                  purchase.paidby
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      paidby: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.paidby
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.recipient ||
                                  purchase.recipient
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      recipient: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.recipient
                            )}
                          </td>
                          <td className="table-secondary">
                            {selectedPurchases.some(
                              (p) => p._id === purchase._id
                            ) ? (
                              <input
                                type="text"
                                value={
                                  editableFields[purchase._id]?.datepayment ||
                                  purchase.datepayment
                                }
                                onChange={(e) =>
                                  setEditableFields((prevFields) => ({
                                    ...prevFields,
                                    [purchase._id]: {
                                      ...prevFields[purchase._id],
                                      datepayment: e.target.value,
                                    },
                                  }))
                                }
                              />
                            ) : (
                              purchase.datepayment
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  {selectedPurchases.length > 0 && (
                    <div className="edit-form">
                      <button type="submit" onClick={handleSubmit} className="save-button">
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
