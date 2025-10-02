import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaChartBar, FaPlus, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaUsers className="me-2" />
          Employee Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/') || isActive('/employees') ? 'active' : ''}`}
                to="/"
              >
                <FaHome className="me-1" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/employees/add') ? 'active' : ''}`}
                to="/employees/add"
              >
                <FaPlus className="me-1" />
                Add Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/stats') ? 'active' : ''}`}
                to="/stats"
              >
                <FaChartBar className="me-1" />
                Statistics
              </Link>
            </li>
          </ul>

          <div className="navbar-text">
            <small className="text-light">
              Employee Management System v1.0
            </small>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


