import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import clgLogo from "./photos/clgLogo.png";
import india from "./photos/india.png";
import logo from "./photos/cgectimes.png";
import mainLogo from "./photos/ct.jpg";

// import { HashLink as Link } from 'react-router-hash-link';
// import home from './Home'

const NavBar = () => {
  const [showUserDropdown, setshowUserDropdown] = useState(false);
  const [showPublicationsDropdown, setshowPublicationsDropdown] =
    useState(false);
  const [showSportsDropdown, setshowSportsDropdown] = useState(false);
  const [showClubDropdown, setshowClubDropdown] = useState(false);
  const [showAcaDeptDropdown, setshowAcaDeptDropdown] = useState(false);
  const [showAcaEventDropdown, setshowAcaEventDropdown] = useState(false);
  const [showInterviewsDropdown, setshowInterviewsDropdown] = useState(false);
  const [showFestGalDropdown, setshowFestGalDropdown] = useState(false);

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const today = new Date();
    return today.toLocaleDateString("en-US", options);
  };

  return (
    <div className="main_nav">
      <div className="fixed-top bg-white">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="head container-fluid">
            <div
              className="user-dropdown-container ms-3"
              onMouseEnter={() => setshowUserDropdown(true)}
              onMouseLeave={() => setshowUserDropdown(false)}
            >
              <div
                className="user-menu d-flex align-items-center"
                onClick={() => setshowUserDropdown(!showUserDropdown)}
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-user-circle user-menu-icon"></i>
                <i
                  className={`fas fa-caret-down ms-2 ${
                    showUserDropdown ? "fa-rotate-180" : ""
                  }`}
                ></i>
              </div>

              {showUserDropdown && (
                <div className="user-dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <i className="fas fa-user me-2"></i>Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <i className="fas fa-cog me-2"></i>Settings
                  </Link>
                  <Link to="/logout" className="dropdown-item">
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </Link>
                </div>
              )}
            </div>

            {/* <div className="search-box">
                            <input className="form-control" type="text" placeholder="Search" />
                        </div> */}

            <div className="navbar-brand d-flex align-items-center">
              <img src={clgLogo} alt="Logo" className="logo-img mx-2" />
              <span className="dept-names">
                BSH | CSE || ECE | EE || ME | CE
              </span>
              <img src={clgLogo} alt="Logo" className="logo-img mx-2" />
            </div>

            <div className="d-flex align-items-center">
              <div className="nav-item email-btn">
                <a href="mailto:thecgectimesofficial@gmail.com">
                  Email<i className="fas fa-envelope mx-1"></i>
                </a>
              </div>
              <a href="https://www.linkedin.com/company/the-cgec-times/">
                <i className="fab fa-linkedin-in mx-2 linkedIn social-icon"></i>
              </a>
              <a href="https://www.instagram.com/the_cgec_times/">
                <i className="fab fa-instagram mx-2 instaGram social-icon"></i>
              </a>
              <a href="https://www.facebook.com/people/The-CGEC-TIMES/100088137340330/">
                <i className="fab fa-facebook-f mx-2 faceBook social-icon"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div
        className="header-section login_sec container-fluid bg-white"
        style={{ marginTop: "80px" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
              <div className="dateDetails d-flex justify-content-center align-items-center mb-3 mb-md-0">
                <u>
                  {" "}
                  {getCurrentDate()} || e-Paper || TODAY'S PAPER <br /> ENGLISH
                  | বাংলা | हिंदी
                </u>
              </div>
              <div className="clg_logos d-flex mb-3 mb-md-0">
                <img className="main_logo" src={mainLogo} alt="" />
                <img className="cgec" src={logo} alt="" />
              </div>
              <div>
                <div className="edition my-1">
                  EDITION <img src={india} alt="" />
                  INDIA
                </div>
                <div className="logSign">
                  <button className="btn logIn btn-primary">
                    <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/login_page/index.html">
                      Log In
                    </a>
                  </button>
                  <button className="btn signIn btn-primary mx-1">
                    <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/login_page/signUp/Singup.html">
                      Sign In
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="publications-section button_sec container-fluid bg-white p-2">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              <div
                className="position-relative d-inline-block me-3 my-1"
                onMouseEnter={() => setshowPublicationsDropdown(true)}
                onMouseLeave={() => setshowPublicationsDropdown(false)}
              >
                <button
                  className="publication-item"
                  onClick={() =>
                    setshowPublicationsDropdown(!showPublicationsDropdown)
                  }
                >
                  Publications{" "}
                  <i
                    className={`fas fa-caret-down ms-1 ${
                      showPublicationsDropdown ? "fa-rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showPublicationsDropdown && (
                  <div className="publications-dropdown-menu">
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-book me-2"></i>College Magazine
                    </Link>
                    <Link to="/newsletter" className="dropdown-item">
                      <i className="fas fa-newspaper me-2"></i>Monthly
                      Newsletter
                    </Link>
                    <Link to="/annual-report" className="dropdown-item">
                      <i className="fas fa-file-alt me-2"></i>Annual Report
                    </Link>
                    <Link to="/research-papers" className="dropdown-item">
                      <i className="fas fa-flask me-2"></i>Research Papers
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="position-relative d-inline-block me-3 my-1"
                onMouseEnter={() => setshowSportsDropdown(true)}
                onMouseLeave={() => setshowSportsDropdown(false)}
              >
                <button
                  className="publication-item"
                  onClick={() => setshowSportsDropdown(!showSportsDropdown)}
                >
                  Sports{" "}
                  <i
                    className={`fas fa-caret-down ms-1 ${
                      showSportsDropdown ? "fa-rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showSportsDropdown && (
                  <div className="publications-dropdown-menu">
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-baseball-bat-ball icon me-2"></i>
                      Cricket
                    </Link>
                    <Link to="/newsletter" className="dropdown-item">
                      <i className="fas fa-futbol me-2"></i>Football
                    </Link>
                    <Link to="/annual-report" className="dropdown-item">
                      <i className="fas fa-volleyball-ball me-2"></i>volley ball
                    </Link>
                    <Link to="/research-papers" className="dropdown-item">
                      <i className="fas fa-table-tennis me-2"></i>Badminton
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="position-relative d-inline-block me-3 my-1"
                onMouseEnter={() => setshowClubDropdown(true)}
                onMouseLeave={() => setshowClubDropdown(false)}
              >
                <button
                  className="publication-item"
                  onClick={() => setshowClubDropdown(!showClubDropdown)}
                >
                  Commities{" "}
                  <i
                    className={`fas fa-caret-down ms-1 ${
                      showClubDropdown ? "fa-rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showClubDropdown && (
                  <div className="publications-dropdown-menu">
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-hands-helping me-2"></i>Anti Raging
                    </Link>
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-exclamation-triangle icon me-2"></i>{" "}
                      Internal Grievance Committe
                    </Link>
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-tasks icon me-2"></i>Internal Quality
                      Assurance Committee
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="position-relative d-inline-block me-3 my-1"
                onMouseEnter={() => setshowAcaDeptDropdown(true)}
                onMouseLeave={() => setshowAcaDeptDropdown(false)}
              >
                <button
                  className="publication-item"
                  onClick={() => setshowAcaDeptDropdown(!showAcaDeptDropdown)}
                >
                  Academic Dept.{" "}
                  <i
                    className={`fas fa-caret-down ms-1 ${
                      showAcaDeptDropdown ? "fa-rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showAcaDeptDropdown && (
                  <div className="publications-dropdown-menu">
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-atom me-2"></i>Basic Science and
                      Humanities
                    </Link>
                    <Link to="/newsletter" className="dropdown-item">
                      <i className="fas fa-desktop me-2"></i>Computer Science
                      Engineering
                    </Link>
                    <Link to="/annual-report" className="dropdown-item">
                      <i className="fas fa-microchip me-2"></i>Electronic And
                      Communication Engineering
                    </Link>
                    <Link to="/research-papers" className="dropdown-item">
                      <i className="fas fa-bolt me-2"></i> Electrical
                      Engineering
                    </Link>
                    <Link to="/research-papers" className="dropdown-item">
                      <i className="fas fa-cogs me-2"></i>Mechanical Engineering
                    </Link>
                    <Link to="/research-papers" className="dropdown-item">
                      <i className="fas fa-ruler-combined me-2"></i>Civil
                      Engineering
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="position-relative d-inline-block me-3 my-1"
                onMouseEnter={() => setshowAcaEventDropdown(true)}
                onMouseLeave={() => setshowAcaEventDropdown(false)}
              >
                <button
                  className="publication-item"
                  onClick={() => setshowAcaEventDropdown(!showAcaEventDropdown)}
                >
                  Academic Events{" "}
                  <i
                    className={`fas fa-caret-down ms-1 ${
                      showAcaEventDropdown ? "fa-rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showAcaEventDropdown && (
                  <div className="publications-dropdown-menu">
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-infinity me-2"></i> Tech Fest
                    </Link>
                    <Link to="/newsletter" className="dropdown-item">
                      <i className="fas fa-question-circle me-2"></i>Tech Quiz
                    </Link>
                    <Link to="/annual-report" className="dropdown-item">
                      <i className="fas fa-code me-2"></i>Code-A-Thon
                    </Link>
                    <Link to="/research-papers" className="dropdown-item">
                      <i className="fas fa-sitemap me-2"></i>Dev-Draw2.0
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="position-relative d-inline-block me-3 my-1"
                onMouseEnter={() => setshowInterviewsDropdown(true)}
                onMouseLeave={() => setshowInterviewsDropdown(false)}
              >
                <button
                  className="publication-item"
                  onClick={() =>
                    setshowInterviewsDropdown(!showInterviewsDropdown)
                  }
                >
                  Interviews{" "}
                  <i
                    className={`fas fa-caret-down ms-1 ${
                      showInterviewsDropdown ? "fa-rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showInterviewsDropdown && (
                  <div className="publications-dropdown-menu">
                    <Link to="/newsletter" className="dropdown-item">
                      <i className="fas fa-wifi icon me-2"></i>Online
                    </Link>
                    <Link to="/magazine" className="dropdown-item">
                      <i className="fas fa-globe me-2"></i>Offline
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="position-relative d-inline-block me-3 my-1"
                onMouseEnter={() => setshowFestGalDropdown(true)}
                onMouseLeave={() => setshowFestGalDropdown(false)}
              >
                <button
                  className="publication-item"
                  onClick={() => setshowFestGalDropdown(!showFestGalDropdown)}
                >
                  Fest Gallery{" "}
                  <i
                    className={`fas fa-caret-down ms-1 ${
                      showFestGalDropdown ? "fa-rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {showFestGalDropdown && (
                  <div className="publications-dropdown-menu">
                    <Link to="/newsletter" className="dropdown-item">
                      <i className="fas fa-wifi icon me-2"></i>Online
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="margin"></div>
    </div>
  );
};

export default NavBar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./NavBar.css";
// import clgLogo from "./photos/clgLogo.png";
// import india from "./photos/india.png";
// import logo from "./photos/cgectimes.png";
// import mainLogo from "./photos/ct.jpg";

// const NavBar = () => {
//   const [showUserDropdown, setshowUserDropdown] = useState(false);
//   const [showPublicationsDropdown, setshowPublicationsDropdown] = useState(false);
//   const [showSportsDropdown, setshowSportsDropdown] = useState(false);
//   const [showClubDropdown, setshowClubDropdown] = useState(false);
//   const [showAcaDeptDropdown, setshowAcaDeptDropdown] = useState(false);
//   const [showAcaEventDropdown, setshowAcaEventDropdown] = useState(false);
//   const [showInterviewsDropdown, setshowInterviewsDropdown] = useState(false);
//   const [showFestGalDropdown, setshowFestGalDropdown] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     // Apply dark mode class to body or root element
//     if (!darkMode) {
//       document.body.classList.add('dark-mode');
//     } else {
//       document.body.classList.remove('dark-mode');
//     }
//   };

//   const getCurrentDate = () => {
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     };
//     const today = new Date();
//     return today.toLocaleDateString("en-US", options);
//   };

//   return (
//     <div className={`main_nav ${darkMode ? 'dark-mode' : ''}`}>
//       <div className={`fixed-top ${darkMode ? 'bg-dark' : 'bg-white'}`}>
//         <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light'}`}>
//           <div className="head container-fluid">

//             <div className="user-dropdown-container ms-3"
//               onMouseEnter={() => setshowUserDropdown(true)}
//               onMouseLeave={() => setshowUserDropdown(false)}>
//               <div
//                 className="user-menu d-flex align-items-center"
//                 onClick={() => setshowUserDropdown(!showUserDropdown)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <i className="fas fa-user-circle user-menu-icon"></i>
//                 <i
//                   className={`fas fa-caret-down ms-2 ${
//                     showUserDropdown ? "fa-rotate-180" : ""
//                   }`}
//                 ></i>
//               </div>

//               {showUserDropdown && (
//                 <div className={`user-dropdown-menu ${darkMode ? 'dark-dropdown' : ''}`}>
//                   <Link to="/profile" className="dropdown-item">
//                     <i className="fas fa-user me-2"></i>Profile
//                   </Link>
//                   <Link to="/settings" className="dropdown-item">
//                     <i className="fas fa-cog me-2"></i>Settings
//                   </Link>
//                   <Link to="/logout" className="dropdown-item">
//                     <i className="fas fa-sign-out-alt me-2"></i>Logout
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <div className="navbar-brand d-flex align-items-center">
//               <img src={clgLogo} alt="Logo" className="logo-img mx-2" />
//               <span className={`dept-names ${darkMode ? 'text-light' : ''}`}>
//                 BSH | CSE || | ECE | EE || ME | CE
//               </span>
//               <img src={clgLogo} alt="Logo" className="logo-img mx-2" />
//             </div>

//             <div className="d-flex align-items-center">
//               {/* Dark mode toggle button */}
//               <button
//                 className="btn btn-sm mx-2"
//                 onClick={toggleDarkMode}
//                 title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//               >
//                 {darkMode ? (
//                   <i className="fas fa-sun text-warning"></i>
//                 ) : (
//                   <i className="fas fa-moon text-dark"></i>
//                 )}
//               </button>

//               <div className={`nav-item email-btn ${darkMode ? 'dark-email-btn' : ''}`}>
//                 <a href="mailto:thecgectimesofficial@gmail.com">
//                   Email<i className="fas fa-envelope mx-1"></i>
//                 </a>
//               </div>
//               <a href="https://www.linkedin.com/company/the-cgec-times/">
//                 <i className="fab fa-linkedin-in mx-2 linkedIn social-icon"></i>
//               </a>
//               <a href="https://www.instagram.com/the_cgec_times/">
//                 <i className="fab fa-instagram mx-2 instaGram social-icon"></i>
//               </a>
//               <a href="https://www.facebook.com/people/The-CGEC-TIMES/100088137340330/">
//                 <i className="fab fa-facebook-f mx-2 faceBook social-icon"></i>
//               </a>
//             </div>
//           </div>
//         </nav>
//       </div>

//       <div
//         className={`header-section login_sec container-fluid ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
//         style={{ marginTop: "80px" }}
//       >
//        <div className="row">
//           <div className="col-md-12">
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3">
//               <div className="dateDetails d-flex justify-content-center align-items-center mb-3 mb-md-0">
//                 <u>
//                   {" "}
//                   {getCurrentDate()} || e-Paper || TODAY'S PAPER <br /> ENGLISH
//                   | বাংলা | हिंदी
//                 </u>
//               </div>
//               <div className="clg_logos d-flex mb-3 mb-md-0">
//                 <img className="main_logo" src={mainLogo} alt="" />
//                 <img className="cgec" src={logo} alt="" />
//               </div>
//               <div>
//                 <div className="edition my-1">
//                   EDITION <img src={india} alt="" />
//                   INDIA
//                 </div>
//                 <div className="logSign">
//                   <button className="btn logIn btn-primary">
//                     <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/login_page/index.html">
//                       Log In
//                     </a>
//                   </button>
//                   <button className="btn signIn btn-primary mx-1">
//                     <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/login_page/signUp/Singup.html">
//                       Sign In
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={`publications-section button_sec container-fluid ${darkMode ? 'bg-dark text-light' : 'bg-white'} p-2`}>
//         <div className="row">
//           <div className="col-md-12">
//             <div className="d-flex flex-wrap justify-content-center align-items-center">

//               <div
//                 className="position-relative d-inline-block me-3 my-1"
//                 onMouseEnter={() => setshowPublicationsDropdown(true)}
//                 onMouseLeave={() => setshowPublicationsDropdown(false)}
//               >
//                 <button
//                   className="publication-item"
//                   onClick={() =>
//                     setshowPublicationsDropdown(!showPublicationsDropdown)
//                   }
//                 >
//                   Publications{" "}
//                   <i
//                     className={`fas fa-caret-down ms-1 ${
//                       showPublicationsDropdown ? "fa-rotate-180" : ""
//                     }`}
//                   ></i>
//                 </button>

//                 {showPublicationsDropdown && (
//                   <div className="publications-dropdown-menu">
//                     <Link to="/magazine" className="dropdown-item">
//                       <i className="fas fa-book me-2"></i>College Magazine
//                     </Link>
//                     <Link to="/newsletter" className="dropdown-item">
//                       <i className="fas fa-newspaper me-2"></i>Monthly
//                       Newsletter
//                     </Link>
//                     <Link to="/annual-report" className="dropdown-item">
//                       <i className="fas fa-file-alt me-2"></i>Annual Report
//                     </Link>
//                     <Link to="/research-papers" className="dropdown-item">
//                       <i className="fas fa-flask me-2"></i>Research Papers
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <div
//                 className="position-relative d-inline-block me-3 my-1"
//                 onMouseEnter={() => setshowSportsDropdown(true)}
//                 onMouseLeave={() => setshowSportsDropdown(false)}
//               >
//                 <button
//                   className="publication-item"
//                   onClick={() => setshowSportsDropdown(!showSportsDropdown)}
//                 >
//                   Sports{" "}
//                   <i
//                     className={`fas fa-caret-down ms-1 ${
//                       showSportsDropdown ? "fa-rotate-180" : ""
//                     }`}
//                   ></i>
//                 </button>

//                 {showSportsDropdown && (
//                   <div className="publications-dropdown-menu">
//                     <Link to="/magazine" className="dropdown-item">
//                     <i className="fas fa-baseball-bat-ball icon me-2"></i>Cricket
//                     </Link>
//                     <Link to="/newsletter" className="dropdown-item">
//                       <i className="fas fa-futbol me-2"></i>Football
//                     </Link>
//                     <Link to="/annual-report" className="dropdown-item">
//                       <i className="fas fa-volleyball-ball me-2"></i>volley ball
//                     </Link>
//                     <Link to="/research-papers" className="dropdown-item">
//                       <i className="fas fa-table-tennis me-2"></i>Badminton
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <div
//                 className="position-relative d-inline-block me-3 my-1"
//                 onMouseEnter={() => setshowClubDropdown(true)}
//                 onMouseLeave={() => setshowClubDropdown(false)}
//               >
//                 <button
//                   className="publication-item"
//                   onClick={() => setshowClubDropdown(!showClubDropdown)}
//                 >
//                   Commities{" "}
//                   <i
//                     className={`fas fa-caret-down ms-1 ${
//                       showClubDropdown ? "fa-rotate-180" : ""
//                     }`}
//                   ></i>
//                 </button>

//                 {showClubDropdown && (
//                   <div className="publications-dropdown-menu">
//                     <Link to="/magazine" className="dropdown-item">
//                       <i className="fas fa-hands-helping me-2"></i>Anti Raging
//                     </Link>
//                     <Link to="/magazine" className="dropdown-item">
//                     <i className="fas fa-exclamation-triangle icon me-2"></i> Internal Grievance Committe
//                     </Link>
//                     <Link to="/magazine" className="dropdown-item">
//                       <i className="fas fa-tasks icon me-2"></i>Internal Quality Assurance Committee
//                     </Link>

//                   </div>
//                 )}
//               </div>

//               <div
//                 className="position-relative d-inline-block me-3 my-1"
//                 onMouseEnter={() => setshowAcaDeptDropdown(true)}
//                 onMouseLeave={() => setshowAcaDeptDropdown(false)}
//               >
//                 <button
//                   className="publication-item"
//                   onClick={() => setshowAcaDeptDropdown(!showAcaDeptDropdown)}
//                 >
//                   Academic Dept.{" "}
//                   <i
//                     className={`fas fa-caret-down ms-1 ${
//                       showAcaDeptDropdown ? "fa-rotate-180" : ""
//                     }`}
//                   ></i>
//                 </button>

//                 {showAcaDeptDropdown && (
//                   <div className="publications-dropdown-menu">
//                     <Link to="/magazine" className="dropdown-item">
//                     <i className="fas fa-atom me-2"></i>Basic Science and Humanities
//                     </Link>
//                     <Link to="/newsletter" className="dropdown-item">
//                     <i className="fas fa-desktop me-2"></i>Computer Science Engineering
//                     </Link>
//                     <Link to="/annual-report" className="dropdown-item">
//                     <i className="fas fa-microchip me-2"></i>Electronic And Communication Engineering
//                     </Link>
//                     <Link to="/research-papers" className="dropdown-item">
//                     <i className="fas fa-bolt me-2"></i> Electrical Engineering
//                     </Link>
//                     <Link to="/research-papers" className="dropdown-item">
//                     <i className="fas fa-cogs me-2"></i>Mechanical Engineering
//                     </Link>
//                     <Link to="/research-papers" className="dropdown-item">
//                     <i className="fas fa-ruler-combined me-2"></i>Civil Engineering
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <div
//                 className="position-relative d-inline-block me-3 my-1"
//                 onMouseEnter={() => setshowAcaEventDropdown(true)}
//                 onMouseLeave={() => setshowAcaEventDropdown(false)}
//               >
//                 <button
//                   className="publication-item"
//                   onClick={() => setshowAcaEventDropdown(!showAcaEventDropdown)}
//                 >
//                   Academic Events{" "}
//                   <i
//                     className={`fas fa-caret-down ms-1 ${
//                       showAcaEventDropdown ? "fa-rotate-180" : ""
//                     }`}
//                   ></i>
//                 </button>

//                 {showAcaEventDropdown && (
//                   <div className="publications-dropdown-menu">
//                     <Link to="/magazine" className="dropdown-item">
//                     <i className="fas fa-infinity me-2"></i> Tech Fest
//                     </Link>
//                     <Link to="/newsletter" className="dropdown-item">
//                       <i className="fas fa-question-circle me-2"></i>Tech Quiz
//                     </Link>
//                     <Link to="/annual-report" className="dropdown-item">
//                       <i className="fas fa-code me-2"></i>Code-A-Thon
//                     </Link>
//                     <Link to="/research-papers" className="dropdown-item">
//                       <i className="fas fa-sitemap me-2"></i>Dev-Draw2.0
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <div
//                 className="position-relative d-inline-block me-3 my-1"
//                 onMouseEnter={() => setshowInterviewsDropdown(true)}
//                 onMouseLeave={() => setshowInterviewsDropdown(false)}
//               >
//                 <button
//                   className="publication-item"
//                   onClick={() => setshowInterviewsDropdown(!showInterviewsDropdown)}
//                 >
//                   Interviews{" "}
//                   <i
//                     className={`fas fa-caret-down ms-1 ${
//                       showInterviewsDropdown ? "fa-rotate-180" : ""
//                     }`}
//                   ></i>
//                 </button>

//                 {showInterviewsDropdown && (
//                   <div className="publications-dropdown-menu">
//                     <Link to="/newsletter" className="dropdown-item">
//                     <i className="fas fa-wifi icon me-2"></i>Online
//                     </Link>
//                     <Link to="/magazine" className="dropdown-item">
//                     <i className="fas fa-globe me-2"></i>Offline
//                     </Link>

//                   </div>
//                 )}
//               </div>

//               <div
//                 className="position-relative d-inline-block me-3 my-1"
//                 onMouseEnter={() => setshowFestGalDropdown(true)}
//                 onMouseLeave={() => setshowFestGalDropdown(false)}
//               >
//                 <button
//                   className="publication-item"
//                   onClick={() => setshowFestGalDropdown(!showFestGalDropdown)}
//                 >
//                   Fest Gallery{" "}
//                   <i
//                     className={`fas fa-caret-down ms-1 ${
//                       showFestGalDropdown ? "fa-rotate-180" : ""
//                     }`}
//                   ></i>
//                 </button>

//                 {showFestGalDropdown && (
//                   <div className="publications-dropdown-menu">
//                     <Link to="/newsletter" className="dropdown-item">
//                     <i className="fas fa-wifi icon me-2"></i>Online
//                     </Link>

//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="margin"></div>
//     </div>
//   );
// };

// export default NavBar;
