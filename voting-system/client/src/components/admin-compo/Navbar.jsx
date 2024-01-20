import React from "react";
import { Link } from "react-router-dom";
import Admin_logo from "../../assets/Images/profile-image.png";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button"

function Navbar() {

    const handleLogout=()=>{
      Cookies.remove("Role");
      Cookies.remove("Name");
      Cookies.remove("Profile")
      window.location('/');
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid ">
        <div className="nav-item ">

            <img src={Cookies.get("Profile")} alt="Admin" className="Admin-profile" />
          <span style={{marginRight:"3rem"}}>
            {Cookies.get("Name")}
            </span>

          <Button variant="info" style={{backgroundColor: "#87CEFA"}} onClick={handleLogout}>Logout</Button>

                   {/* <ul
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;