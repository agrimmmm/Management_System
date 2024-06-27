import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SignupPage from "./Signup";
import PurchasePage from "./purchasepage";
import TicketForm from "./ticketraiseform";
import ViewAllPurchasePage from "./ViewAllPurchases";
import ViewAllTicketsPage from "./ViewAllTickets";
import PurchaseOptions from "./PurchaseOptions";
import Home from "./Home";
import PurchaseTracker from "./PurchaseTracker";
import TicketTracker from "./TicketTracker";
import LoginPage from "./LoginPage";
import DroneOptions from "./DroneOptions";
// import { USER, ROLE } from "./LoginPage";
import { getUser, getRole } from "./LoginPage";
import LeaveApplicationForm from "./leaveapplication";
import Viewallleaves from "./Viewallleaves";
import Viewyourleaves from "./viewyourleaves";
import LeaveOptions from "./leaveoptions";
import Search from "./search";
// const USER = localStorage.getItem("USER") || "";
// const ROLE = localStorage.getItem("ROLE") || "";
// console.log(USER);
const USER = getUser();
const ROLE = getRole();
console.log(USER, ROLE);
const isAuthenticated = () => {
  return USER !== "";
};
const PrivateRoute = ({ children }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/drone-testing"
        element={
          <PrivateRoute>
            <DroneOptions />
          </PrivateRoute>
        }
      />
      <Route
        path="/leave-page"
        element={
          <PrivateRoute>
            <LeaveOptions />
          </PrivateRoute>
        }
      />
      <Route
        path="/leaveapplication"
        element={
          <PrivateRoute>
            <LeaveApplicationForm />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/viewallleaves"
        element={
          <PrivateRoute>
            <Viewallleaves />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        }
      />
      <Route
        path="/viewyourleaves"
        element={
          <PrivateRoute>
            <Viewyourleaves />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/purchase-page"
        element={
          <PrivateRoute>
            <PurchaseOptions />
          </PrivateRoute>
        }
      />
      <Route
        path="/purchase"
        element={
          <PrivateRoute>
            <PurchasePage />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/ticketform"
        element={
          <PrivateRoute>
            <TicketForm />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/viewallpurchase"
        element={
          <PrivateRoute>
            <ViewAllPurchasePage />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/viewalltickets"
        element={
          <PrivateRoute>
            <ViewAllTicketsPage />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/tickettracker"
        element={
          <PrivateRoute>
            <TicketTracker />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/purchasetracker"
        element={
          <PrivateRoute>
            <PurchaseTracker />{" "}
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AnimatedRoutes;
