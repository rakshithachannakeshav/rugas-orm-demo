import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Order Management</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/customers">Customers</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
