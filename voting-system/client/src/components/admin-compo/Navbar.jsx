import React from "react";
import { Link } from "react-router-dom";
import Admin_logo from "../../assets/Images/profile-image.png";
import Cookies from "js-cookie";

function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid ">
           <div class="nav-item dropdown">
            <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={Admin_logo} alt="Admin" className="Admin-profile" />
            {Cookies.get("name")}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
