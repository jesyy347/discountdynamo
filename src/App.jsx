
import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { FaWallet, FaTags, FaChartBar, FaUniversity } from "react-icons/fa";

const Sidebar = () => (
  <div className="w-64 bg-purple-700 h-screen text-white p-5 flex flex-col">
    <h1 className="text-2xl font-bold mb-6">Cashback App</h1>
    <NavLink to="/wallet" className="mb-4 flex items-center gap-2 p-2 rounded hover:bg-purple-500">
      <FaWallet /> Wallet
    </NavLink>
    <NavLink to="/discounts" className="mb-4 flex items-center gap-2 p-2 rounded hover:bg-purple-500">
      <FaTags /> Discounts
    </NavLink>
    <NavLink to="/analytics" className="mb-4 flex items-center gap-2 p-2 rounded hover:bg-purple-500">
      <FaChartBar /> Analytics
    </NavLink>
    <NavLink to="/bank" className="mb-4 flex items-center gap-2 p-2 rounded hover:bg-purple-500">
      <FaUniversity /> Bank Accounts
    </NavLink>
  </div>
);

const Wallet = () => <div className="p-5 text-gray-800">Wallet Section</div>;
const Discounts = () => <div className="p-5 text-gray-800">Discount Creation</div>;
const Analytics = () => <div className="p-5 text-gray-800">Analytics Dashboard</div>;
const Bank = () => <div className="p-5 text-gray-800">Bank Account Management</div>;

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-10 bg-white">
          <Routes>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/bank" element={<Bank />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
