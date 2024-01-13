import React from "react";
import { Link } from "react-router-dom";
import Admin_logo from "../../assets/Images/profile-image.png";
import Cookies from "js-cookie";

function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid ">
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
          {/* <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="nav-item">Logout
              <button class="btn" type="submit">
                Logout
              </button>
            </li>
          </ul> */}

          {/* </div> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
