// import logo from './User/User-tool/image/e-election-vertical.png'
// import formlogo from './User/User-tool/image/form logo.png'
import React, { useRef } from "react";
import { ADMIN_LOGIN, BASE_URL } from "../../redux-saga/constant";
import axios from "axios";

const Login = () => {
  const name = useRef();
  const password = useRef();

  const handleLogin = () => {

    const data = {
      name: name.current.value,
      password: password.current.value
    }
       axios.post(BASE_URL + ADMIN_LOGIN, data).then((res) => {
      console.log(res);
      Cookies.set("role", res.data.data.role)
      Cookies.set("name", res.data.data.name)
      window.location = "/dashboard"
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <section className="vh-100 login-section">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://img.freepik.com/free-vector/electronic-voting-abstract-concept-illustration_335657-1876.jpg?w=740&t=st=1704855860~exp=1704856460~hmac=4aaf803de6766073536e070ba8d69cf8ea189dca8dbec68ef55a591f31167bd0"
                    alt="login form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                                            <span className="h1 fw-bold mb-0" >Login </span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: 1 }}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-floating  mb-4">
                        <input
                          type="name"
                          className="form-control"
                          id="floatingName"
                          placeholder="Name"
                          ref={name}
                        />
                        <label htmlFor="floatingEmail">UserName</label>
                      </div>
                      <div className="form-floating  mb-4">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          ref={password}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="mb-4">
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

                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?
                        <a href="#!" style={{ color: "#393f81" }}>
                          Register here
                        </a>
                      </p>
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
