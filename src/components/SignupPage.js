import React from "react";
import { Link } from "react-router-dom";
import mainLogo from "./photos/ct.jpg";
import "./SignupPage.css";

const SignupPage = () => {
  return (
    <div className="signup-wrapper bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none text-secondary small fw-bold">
                <i className="fas fa-arrow-left me-1"></i> Back to Home
              </Link>
            </div>

            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <img src={mainLogo} alt="Logo" className="rounded-circle mb-3 shadow-sm" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  <h2 className="fw-bold">Sign Up</h2>
                  <p className="text-muted small">Be a part of Cooch Behar's largest campus news network</p>
                </div>

                <form>
                  <div className="row g-2">
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0 bg-light px-3" id="fname" placeholder="First Name" style={{ borderRadius: '10px' }} />
                        <label htmlFor="fname">First Name</label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0 bg-light px-3" id="lname" placeholder="Last Name" style={{ borderRadius: '10px' }} />
                        <label htmlFor="lname">Last Name</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control border-0 bg-light px-3" id="semail" placeholder="Email" style={{ borderRadius: '10px' }} />
                    <label htmlFor="semail">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control border-0 bg-light px-3" id="spass" placeholder="Password" style={{ borderRadius: '10px' }} />
                    <label htmlFor="spass">Create Password</label>
                  </div>
                  <button className="btn btn-primary w-100 py-3 fw-bold shadow" style={{ borderRadius: '10px' }}>
                    REGISTER NOW
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="small text-muted mb-0">Already a member?</p>
                  <Link to="/login" className="fw-bold text-decoration-none">Sign In Here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;