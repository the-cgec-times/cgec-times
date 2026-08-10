import React from "react";
import { Link } from "react-router-dom";
import logo from "../components/photos/cgectimes.png";
import "../components/SiteFooter.css";

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="container">

        <div className="row gy-5">

          <div className="col-lg-4">
            <img
              src={logo}
              alt="CGEC TIMES"
              className="footer-logo"
            />

            <p className="footer-text">
              CGEC Times is a student-driven digital media platform
              sharing campus news, events, achievements, interviews,
              sports and student stories.
            </p>

            <div className="footer-social">

              <a
                href="https://www.instagram.com/the_cgec_times/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href="https://www.linkedin.com/company/the-cgec-times/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a
                href="https://www.facebook.com/people/The-CGEC-TIMES/100088137340330/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

            </div>
          </div>

          <div className="col-lg-2 col-md-6">

            <h5>Quick Links</h5>

            <ul className="footer-links">

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/fest-gallery">
                  Gallery
                </Link>
              </li>

              <li>
                <Link to="/publications/newsletter">
                  Newsletter
                </Link>
              </li>

              <li>
                <Link to="/verify-certificate">
                  Verify Certificate
                </Link>
              </li>

            </ul>
          </div>

          <div className="col-lg-2 col-md-6">

            <h5>Support</h5>

            <ul className="footer-links">

              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>

              <li>
                <a href="mailto:thecgectimesofficial@gmail.com">
                  Contact
                </a>
              </li>

              <li>
                <Link to="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/faq">
                  FAQ
                </Link>
              </li>

            </ul>
          </div>

          <div className="col-lg-4">

            <h5>Campus Location</h5>

            <div className="contact-box">

              <p>
                <i className="fas fa-location-dot me-2"></i>
                Cooch Behar Government Engineering College
              </p>

              <p>
                <i className="fas fa-envelope me-2"></i>
                thecgectimesofficial@gmail.com
              </p>

            </div>

            <div className="footer-map">

              <iframe
                title="CGEC Location"
                src="https://www.google.com/maps?q=Cooch+Behar+Government+Engineering+College&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 CGEC Times | Designed & Developed by THE CGEC TIMES
          </p>

        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;