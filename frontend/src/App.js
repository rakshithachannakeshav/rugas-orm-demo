import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/auth" element={<AuthPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/customers" element={isAuthenticated ? <CustomersPage /> : <Navigate to="/auth" />} />
        <Route path="/orders" element={isAuthenticated ? <OrdersPage /> : <Navigate to="/auth" />} />
        <Route path="/products" element={isAuthenticated ? <ProductsPage /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
