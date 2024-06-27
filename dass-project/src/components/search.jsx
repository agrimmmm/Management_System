import React, { useEffect, useState } from "react";
// import "./CSS/home.css";
// import e from "express";
import img1 from "./CSS/arka_logo.png";
import "./CSS/search.css";
import { getUser } from "./LoginPage";
import { useNavigate } from "react-router";

import axios from "axios";
// import cheerio from "cheerio";
import { load } from "cheerio";

export default function Search() {
  const navigate = useNavigate();
  const [USER, setUSER] = useState(getUser());
  const [searchTerm, setSearchTerm] = useState("");
  const [topProducts, setTopProducts] = useState([]);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`
      );
      const $ = load(response.data);
      const products = $(".s-result-item")
        .map((_, el) => {
          const title = $(el).find("h2 > a > span").text().trim();
          const price = $(el).find(".a-price-whole").text().trim();
          const rating = $(el).find(".a-icon-alt").first().text().trim();
          const link = $(el).find("h2 > a").attr("href");
          return { title, price, rating, link };
        })
        .get();
      setTopProducts(products.slice(0, 6));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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

  const openLink = (link) => () => {
    window.open(`https://www.amazon.in${link}`, "_blank");
  }

  return (
    <div className="App search-body">
      <header className="header mb-3">
        <div onClick={handlehomeredirect} className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
        </div>
        <div className="header-right">
          Hello, {USER}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header><br />
      <h1 className="heading mb-5" style={{ color: "#fff" }}>Tool Search</h1>
      <div className="search-container">
        <div className="form-outline">
          <input
            id="search-input"
            type="search"
            className="form-control"
            onChange={handleSearchChange}
            value={searchTerm}
            placeholder="Search"
          />
        </div>&nbsp;&nbsp;
        <button
          id="search-button"
          type="button"
          className="btn btn-primary big-blue-button"
          onClick={handleSearch}
        >
          Search
          <i class="bi bi-search"></i>
        </button>
      </div>
      <title>Product Table</title>
      <table className="container">
        <thead>
          <tr>
            <th>
              <h1 style={{ fontSize: "16px" }}>Title</h1>
            </th>
            <th>
              <h1 style={{ fontSize: "16px" }}>Price</h1>
            </th>
            <th>
              <h1 style={{ fontSize: "16px" }}>Rating</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {topProducts.slice(-4).map((product, index) => (
            <tr key={index}>
              <td className="product-title" onClick={openLink(product.link)}>{product.title}</td>
              <td className="product-price">{product.price}</td>
              <td className="product-rating">{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <main className="main-content">
        <br />
        <footer className="about">
          Copyright © 2024 Arka Aerospace - All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}
