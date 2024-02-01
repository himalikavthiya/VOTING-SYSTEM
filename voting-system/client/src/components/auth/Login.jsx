import React, { useRef, useState } from "react";
import { BASE_URL, LOGIN_URL } from "../../redux-saga/constant";
import logo from "../../assets/Images/Vote.png";
import axios from "axios";
import Cookies from "js-cookie";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const Email = useRef();
  const Password = useRef();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    const data = {
      Email: Email.current.value,
      Password: Password.current.value,
    };
    console.log(data);
    axios
      .post(BASE_URL + LOGIN_URL, data)
      .then((res) => {
        console.log("res admmin", res);
        Cookies.set("Role", res.data.data.Role);
        Cookies.set("Name", res.data.data.Name);
        Cookies.set("Profile", res.data.data.Profile);
        window.location = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="vh-100 login-section">
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src={logo} alt="login form" />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="align-items-center mb-3 text-center">
                        <h1 className="fw-bold mb-3">Welcome back!</h1>
                        <p
                          style={{ color: "grey", fontSize: "18px" }}
                          className="fw-normal"
                        >
                          Democracy is based upon the conviction there are
                          extraordinary possibilities in ordinary people.
                        </p>
                      </div>

                      <div style={{ position: "relative" }} className="mb-3">
                        <EmailIcon
                          style={{
                            position: "absolute",
                            color: "grey",
                            top: ".8rem",
                            left: ".8rem",
                          }}
                        />
                        <input
                          type="text"
                          className="form-control px-5"
                          id="floatingEmail"
                          placeholder="Enter your Email"
                          ref={Email}
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                      <div style={{ position: "relative" }}>
                        <KeyIcon
                          style={{
                            position: "absolute",
                            color: "grey",
                            top: ".8rem",
                            left: ".8rem",
                          }}
                        />
                        {passwordVisible ? (
                          <VisibilityIcon
                            style={{
                              position: "absolute",
                              color: "grey",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          />
                        ) : (
                          <VisibilityOffIcon
                            style={{
                              position: "absolute",
                              color: "grey",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                            }}
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          />
                        )}
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control px-5"
                          id="floatingPassword"
                          placeholder="Enter your Password"
                          ref={Password}
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-4">
                        <div>
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                      </div>
                      {/* <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?
                        <a href="#!" style={{ color: "#393f81" }}>
                          Register here
                        </a>
                      </p> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
