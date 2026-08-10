import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "./photos/ct.jpg";
import "./LoginPage.css";

const ADMIN_SESSION_KEY = "adminSessionActive";
const LAST_ACTIVITY_KEY = "lastAdminActivity";
const LOGIN_HISTORY_KEY = "adminLoginHistory";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;

    let device = "Unknown Device";
    let browser = "Unknown Browser";

    if (/Samsung/i.test(ua)) {
      device = "Samsung Device";
    } else if (/Redmi/i.test(ua)) {
      device = "Redmi Device";
    } else if (/Mi/i.test(ua)) {
      device = "Xiaomi Device";
    } else if (/Vivo/i.test(ua)) {
      device = "Vivo Device";
    } else if (/OPPO/i.test(ua)) {
      device = "Oppo Device";
    } else if (/Realme/i.test(ua)) {
      device = "Realme Device";
    } else if (/iPhone/i.test(ua)) {
      device = "iPhone";
    } else if (/iPad/i.test(ua)) {
      device = "iPad";
    } else if (/Macintosh|Mac OS X/i.test(ua)) {
      device = "MacBook / Mac";
    } else if (/Windows/i.test(ua)) {
      device = "Windows PC";
    } else if (/Linux/i.test(ua)) {
      device = "Linux Device";
    } else if (/Android/i.test(ua)) {
      device = "Android Mobile";
    }

    if (/Edg/i.test(ua)) {
      browser = "Microsoft Edge";
    } else if (/Chrome/i.test(ua)) {
      browser = "Google Chrome";
    } else if (/Firefox/i.test(ua)) {
      browser = "Mozilla Firefox";
    } else if (/Safari/i.test(ua)) {
      browser = "Safari";
    } else if (/Opera|OPR/i.test(ua)) {
      browser = "Opera";
    }

    return `${device} • ${browser}`;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (localStorage.getItem(ADMIN_SESSION_KEY) === "true") {
      alert(
        "Admin is already logged in on another device or browser.\nPlease logout first."
      );
      return;
    }

    if (
      email === "thecgectimesofficial@gmail.com" &&
      password === "theCgecTimes123"
    ) {

      const loginData = {
        email: email,
        time: new Date().toLocaleString(),
        device: getDeviceInfo(),
      };

      const existingHistory =
        JSON.parse(localStorage.getItem(LOGIN_HISTORY_KEY)) || [];

      existingHistory.unshift(loginData);

      localStorage.setItem(
        LOGIN_HISTORY_KEY,
        JSON.stringify(existingHistory)
      );

      localStorage.setItem("isAdmin", "true");
      localStorage.setItem(ADMIN_SESSION_KEY, "true");
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());

      alert("Login Successful! Welcome Admin.");
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-wrapper bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">

            <div className="text-center mb-4">
              <Link
                to="/"
                className="text-decoration-none text-secondary small fw-bold"
              >
                <i className="fas fa-arrow-left me-1"></i>
                Back to Home
              </Link>
            </div>

            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <img
                    src={mainLogo}
                    alt="Logo"
                    className="rounded-circle mb-3 shadow-sm"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />

                  <h2 className="fw-bold">Admin Login</h2>

                  <p className="text-muted small">
                    Single session • Auto logout after 20 min inactivity
                  </p>
                </div>

                <form onSubmit={handleLogin}>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control border-0 bg-light px-3"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <label>Email address</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control border-0 bg-light px-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <label>Password</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3 fw-bold shadow"
                  >
                    LOG IN
                  </button>

                </form>
              </div>
            </div>

            <div className="text-center mt-3">
              <small className="text-muted">
                <i className="fas fa-lock me-1"></i>
                Admin auto-logout enabled
              </small>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;