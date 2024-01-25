import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Admin_logo from "../../assets/Images/profile-image.png";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Navbar() {
    const MySwal = withReactContent(Swal);

    const handleLogout=()=>{
       MySwal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
         Cookies.remove("Role");
      Cookies.remove("Name");
      Cookies.remove("Profile")
        window.location = "/";
      }
    });

    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid ">
        <div className="nav-item ">

            <img src={Cookies.get("Profile")} alt="Admin" className="Admin-profile" />
          <span style={{marginRight:"3rem",color:"#ffff"}}>
            {Cookies.get("Name")}
            </span>

          <Button variant="info" className="logoutBtn" onClick={handleLogout}>Logout</Button>

            </div>
      </div>
    </nav>
  );
}

export default Navbar;