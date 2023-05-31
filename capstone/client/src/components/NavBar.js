import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles/NavBar.css";

function NavBar() {



  return (
    <div>
      <div className="header-container">
        <ul className="header-menu">
          <li className='title'>
            <NavLink to="/">Deep Blue</NavLink>
            </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/animals">Animals</NavLink>
          </li>
          <li>
            <NavLink to="/map">Map</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        </ul>
      </div>
      <div class="outer-circle">
	    <div class="green-scanner"></div>
    </div>
    </div>
  );
}

export default NavBar;