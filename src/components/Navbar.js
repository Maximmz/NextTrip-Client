import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";
import Logo from "../assets/TravelLogo.png";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { user } = useContext(AuthContext);
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <nav className="navbar">
      <div className={`navbar__leftSide ${openLinks ? "open" : "close"}`}>
        <Link to="/">
          <img className="navbar__logo" src={Logo} alt="Logo" />
        </Link>
        <div className="navbar__hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Log in</Link>
        </div>
      </div>
      <div className="navbar__rightSide">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/about">About</Link>
        {user ? (
          <div className="navbar__visible">
            <Link to="/bookings">
              Bookings
            </Link>
            <Link to="/dashboard">
              <div className="navbar__username">{user.username}</div>
            </Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <button className="navbar__toggleButton" onClick={toggleNavbar}></button>
      </div>
    </nav>
  );
}

export default Navbar;
