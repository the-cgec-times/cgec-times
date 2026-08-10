import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import india from "./photos/india.png";
import logo from "./photos/cgectimes.png";
import mainLogo from "./photos/ct.jpg";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    alert("Logged out successfully!");
    navigate("/");
    window.location.reload();
  };

  const closeMenu = () => {
    const menu = document.getElementById("mainNavbarContent");
    if (menu && menu.classList.contains("show")) {
      new window.bootstrap.Collapse(menu).hide();
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (e, name) => {
    if (window.innerWidth < 992) {
      e.preventDefault();
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <header className="navbar-container fixed-top">
      <div className="top-black-bar">
        <div className="container d-flex justify-content-between align-items-center text-white small">
          <div className="d-none d-md-block">
            <span className="date-badge">
              <i className="far fa-calendar-alt me-2 text-warning"></i>
              {getCurrentDate()}
            </span>
            <span
              className="badge bg-primary ms-3 shadow-sm"
              style={{ fontSize: "9px" }}
            >
              LIVE UPDATES
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 ms-auto">
            {isAdmin && (
  <li className="nav-item">
    <Link
      className="nav-link fw-bold text-uppercase text-warning"
      to="/login-history"
      onClick={closeMenu}
    >
      <i className="fas fa-history me-1"></i>
      Login History
    </Link>
  </li>
)}
            {isAdmin && (
              <span className="badge bg-warning text-dark fw-bold">
                ADMIN MODE
              </span>
            )}

            <a
              href="mailto:thecgectimesofficial@gmail.com"
              className="text-white text-decoration-none fw-bold d-flex align-items-center gap-1"
            >
              <i className="fas fa-envelope text-warning"></i> Email Us
            </a>

            <div className="social-links d-flex gap-2">
              <a
                href="https://www.linkedin.com/company/the-cgec-times/"
                className="text-white"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.instagram.com/the_cgec_times/"
                className="text-white"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/people/The-CGEC-TIMES/100088137340330/"
                className="text-white"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>

            <div className="vr mx-1 bg-secondary d-none d-sm-block"></div>

            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-danger fw-bold py-0 px-2"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white text-decoration-none fw-bold"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="scrollable-header-content">
        <div className="container py-4">
          <div className="d-flex align-items-center justify-content-between d-lg-block">
            <button
              className="navbar-toggler border-0 shadow-none p-0 d-lg-none"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbarContent"
            >
              <i className="fas fa-bars fs-4 text-dark"></i>
            </button>

            <div className="d-flex align-items-center justify-content-center gap-2 gap-md-3 flex-grow-1">
              <img
                src={mainLogo}
                alt="Logo"
                className="rounded-circle shadow-sm border"
                style={{ width: "60px", height: "60px" }}
              />

              <div className="text-start">
                <img
                  src={logo}
                  alt="CGEC TIMES"
                  className="img-fluid"
                  style={{ maxHeight: "50px" }}
                />
                <div
                  className="small text-muted fw-bold"
                  style={{ fontSize: "10px" }}
                >
                  <img src={india} width="13" className="me-1" alt="India" />
                  EDITION INDIA | COOCH BEHAR GOVERNMENT ENGINEERING COLLEGE
                </div>
              </div>
            </div>

            <div className="d-lg-none" style={{ width: "35px" }}></div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg p-0 border-top bg-white">
          <div className="container">
            <div
              className="collapse navbar-collapse justify-content-center"
              id="mainNavbarContent"
            >
              <ul className="navbar-nav py-1 align-items-center">
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-uppercase" onClick={closeMenu} to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle fw-bold text-uppercase"
                    to="#"
                    onClick={(e) => toggleDropdown(e, "publications")}
                  >
                    Publications
                  </Link>
                  <ul
                    className={`dropdown-menu ${openDropdown === "publications" ? "show d-block" : ""}`}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/publications/magazine"onClick={closeMenu}
                      >
                        <i className="fas fa-book-open me-2 text-muted"></i>{" "}
                        College Magazine
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/publications/newsletter"onClick={closeMenu}
                      >
                        <i className="fas fa-newspaper me-2 text-muted"></i>{" "}
                        Monthly Newsletter
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/publications/annualReport"onClick={closeMenu}
                      >
                        <i className="fas fa-file-invoice me-2 text-muted"></i>{" "}
                        Annual Report
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/publications/researchPapers"onClick={closeMenu}
                      >
                        <i className="fas fa-microscope me-2 text-muted"></i>{" "}
                        Research Papers
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle fw-bold text-uppercase"
                    to="#"
                    onClick={(e) => toggleDropdown(e, "sports")}
                  >
                    Sports
                  </Link>
                  <ul
                    className={`dropdown-menu ${openDropdown === "sports" ? "show d-block" : ""}`}
                  >
                    <li>
                      <Link className="dropdown-item" to="/sports/cricket"onClick={closeMenu}>
                        <i className="fas fa-baseball-bat-ball me-2 text-muted"></i>{" "}
                        Cricket
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/sports/football"onClick={closeMenu}>
                        <i className="fas fa-futbol me-2 text-muted"></i>{" "}
                        Football
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/sports/volleyball"onClick={closeMenu}>
                        <i className="fas fa-volleyball me-2 text-muted"></i>{" "}
                        Volleyball
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/sports/badminton"onClick={closeMenu}>
                        <i className="fas fa-table-tennis-paddle-ball me-2 text-muted"></i>{" "}
                        Badminton
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Committees */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle fw-bold text-uppercase"
                    to="#"
                    onClick={(e) => toggleDropdown(e, "committees")}
                  >
                    Committees
                  </Link>
                  <ul
                    className={`dropdown-menu ${openDropdown === "committees" ? "show d-block" : ""}`}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/committees/anti-ragging-committee"onClick={closeMenu}
                      >
                        <i className="fas fa-user-shield me-2 text-muted"></i>{" "}
                        Anti Ragging Committee
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/committees/anti-ragging-squad"onClick={closeMenu}
                      >
                        <i className="fas fa-shield-alt me-2 text-muted"></i>{" "}
                        Anti Ragging Squad
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/committees/grievance"onClick={closeMenu}
                      >
                        <i className="fas fa-balance-scale me-2 text-muted"></i>{" "}
                        Internal Grievance
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/committees/quality-assurance"onClick={closeMenu}
                      >
                        <i className="fas fa-check-double me-2 text-muted"></i>{" "}
                        IQAC Cell
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Departments */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle fw-bold text-uppercase"
                    to="#"
                    onClick={(e) => toggleDropdown(e, "dept")}
                  >
                    Acad. Dept.
                  </Link>
                  <ul
                    className={`dropdown-menu ${openDropdown === "dept" ? "show d-block" : ""}`}
                  >
                    <li>
                      <Link className="dropdown-item" to="/departments/cse"onClick={closeMenu}>
                        <i className="fas fa-laptop-code me-2 text-muted"></i>{" "}
                        CSE
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/departments/ece"onClick={closeMenu}>
                        <i className="fas fa-microchip me-2 text-muted"></i> ECE
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/departments/ee"onClick={closeMenu}>
                        <i className="fas fa-bolt me-2 text-muted"></i> EE
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/departments/me"onClick={closeMenu}>
                        <i className="fas fa-gears me-2 text-muted"></i> ME
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/departments/ce"onClick={closeMenu}>
                        <i className="fas fa-trowel-bricks me-2 text-muted"></i>{" "}
                        CE
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Interviews */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle fw-bold text-uppercase"
                    to="#"
                    onClick={(e) => toggleDropdown(e, "interviews")}
                  >
                    Interviews
                  </Link>
                  <ul
                    className={`dropdown-menu ${openDropdown === "interviews" ? "show d-block" : ""}`}
                  >
                    <li>
                      <Link className="dropdown-item" to="/interviews/online"onClick={closeMenu}>
                        <i className="fas fa-video me-2 text-muted"></i> Online
                        Interviews
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/interviews/offline"
                      onClick={closeMenu}>
                        <i className="fas fa-handshake me-2 text-muted"></i>{" "}
                        Offline Interviews
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Academic Events */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle fw-bold text-uppercase"
                    to="#"
                    onClick={(e) => toggleDropdown(e, "academic")}
                  >
                    Acad. Events
                  </Link>
                  <ul
                    className={`dropdown-menu ${openDropdown === "academic" ? "show d-block" : ""}`}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/academic-events/techFest"
                        onClick={closeMenu}
                      >
                        <i className="fas fa-rocket me-2 text-muted"></i>{" "}
                        ByteBurst
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/academic-events/innovision"
                        onClick={closeMenu}
                      >
                        <i className="fas fa-lightbulb me-2 text-muted"></i>{" "}
                        Innovision
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold text-uppercase"
                    to="/fest-gallery"
                    onClick={closeMenu}
                  >
                    Fest Gallery
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold text-uppercase text-success"
                    to="/verify-certificate"
                    onClick={closeMenu}
                  >
                    <i className="fas fa-certificate me-1"></i>
                    Certificate
                  </Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link
                      className="nav-link fw-bold text-uppercase text-primary"
                      to="/admin-dashboard"
                    >
                      <i className="fas fa-plus-circle me-1"></i> Add News
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="rainbow-divider"></div>
      </div>
    </header>
  );
};

export default NavBar;
