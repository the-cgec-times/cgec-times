import React from "react";
import "./About.css";
import backgroundImage from "./photos/cgec_acdemic.jpeg";
import clgLogo from "./photos/clgLogo.png";

const BackgroundBox = () => {
  return (
    <div className="container-fluid p-0">
      <div
        className="background-box"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={clgLogo} alt="CGEC Logo" className="college-logo" />

        <div className="overlay"></div>

        <div className="main-content-container">
          <div className="about-sections-container">
            <div className="about-section times-section">
              <h2>About CGEC Times</h2>
              <div className="section-content">
                <p>
                  Welcome to CGEC Times, the official newspaper club of Cooch
                  BeharGovernment Engineering College. Established in 2022, we
                  are dedicated to campus. covering all major
                  events,achievements, and activities happening across our
                </p>
                <p>
                  As one of the largest student-led clubs in CGEC, we take pride
                  in bringing well-researched, engaging, and timely news to our
                  readers. Our team works collectively to publish a
                  comprehensive monthly edition that highlights the spirit,
                  innovation, and culture of our college.
                </p>
                <p>
                  We are privileged to have Assistant Professor Sourav
                  Chakraborty as our mentor, guiding us in our journey to make
                  an impact through journalism. Stay informed. Stay inspired.
                  Stay with CGEC Times!
                </p>
              </div>
            </div>

            <div className="about-section college-section">
              <h2>About CGEC</h2>
              <div className="section-content">
                <p>
                  Cooch Behar Government Engineering College (CGEC) is located
                  in a prime location in Cooch Behar District, easily accessible
                  from all parts of the city.{" "}
                </p>
                <p>
                  The college is accredited by AICTE and Maulana Abul Kalam Azad
                  University of Technology, West Bengal, Government of West
                  Bengal.
                </p>
                <p>
                  The Institute has its own wide campus of 20 acres with
                  state-of-the-art laboratories, experienced faculties, and
                  extensive computer facilities coupled with high-tech
                  teaching-learning tools.
                </p>
                <p>
                  We actively participate in local development initiatives and
                  community well-being programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="margin"></div>
    </div>
  );
};

export default BackgroundBox;
