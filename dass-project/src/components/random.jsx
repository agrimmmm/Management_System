import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CSS/purchasepage.css";

export default function PurchasePage() {
  const navigate = useNavigate();
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: 15 }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 ">
                  Purchase requisition Form
                </h3>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          Link to purchase
                        </label>
                        <input
                          type="url"
                          id="linktopurchase"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          Component Name
                        </label>
                        <input
                          type="text"
                          id="ComponentName"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          Quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          CHIMS: Does the purchase involve IC or semiconductor
                          items?
                        </label>
                        <input
                          type="file"
                          id="quantity"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          PO/BOM/Quote Upload
                        </label>
                        <input
                          type="file"
                          id="quantity"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">Team</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option1"
                          />
                          <label className="form-check-label" htmlFor="option1">
                            Embedded
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option2"
                          />
                          <label className="form-check-label" htmlFor="option2">
                            Mechanical
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option3"
                          />
                          <label className="form-check-label" htmlFor="option3">
                            Firmware
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option4"
                          />
                          <label className="form-check-label" htmlFor="option4">
                            Robotics
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option5"
                          />
                          <label className="form-check-label" htmlFor="option5">
                            UAV
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option6"
                          />
                          <label className="form-check-label" htmlFor="option6">
                            AI
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option7"
                          />
                          <label className="form-check-label" htmlFor="option7">
                            Management
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option8"
                          />
                          <label className="form-check-label" htmlFor="option7">
                            Founder's Office
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">Project</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option1"
                          />
                          <label className="form-check-label" htmlFor="option1">
                            Charmender
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option2"
                          />
                          <label className="form-check-label" htmlFor="option2">
                            Pikachu
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option3"
                          />
                          <label className="form-check-label" htmlFor="option3">
                            Starling
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option4"
                          />
                          <label className="form-check-label" htmlFor="option4">
                            DTRS
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option5"
                          />
                          <label className="form-check-label" htmlFor="option5">
                            Generic
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option6"
                          />
                          <label className="form-check-label" htmlFor="option6">
                            MFG
                          </label>
                        </div>

                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
