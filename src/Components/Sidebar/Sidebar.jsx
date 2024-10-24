import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = ({ children }) => {
  return (
    <div className="sidebard">
      <div className="sidebar-left">
        <ul className="sidebar-link">
          <li>
            <Link to="/" className="link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/upload-data" className="link">
              Upload Data
            </Link>
          </li>
        </ul>
      </div>
      <main className="sidebar-right">{children}</main>
    </div>
  );
};

export default Sidebar;
