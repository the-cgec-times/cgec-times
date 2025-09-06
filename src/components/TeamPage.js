import React, { useRef, useEffect, useState } from "react";
import "./TeamPage.css";
import clgLogo from "./photos/ct.jpg";
import logo from "./photos/cgectimes.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";


const TeamPage = () => {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const sampleCertificates = [
    {
      id: "CT2025001",
      name: "Arya Ghosh",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025002",
      name: "Roopam Barman",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025003",
      name: "Kankana Sikder",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025004",
      name: "Nirupam Konar ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025005",
      name: "Arijit Manna ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025006",
      name: "Debayan Sarkar ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025007",
      name: "Anushka Roy",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025008",
      name: "Satyajit Roy",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025009",
      name: "Adityava Gangopadhyay ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025010",
      name: "Joydeep Mitra ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025011",
      name: "Shubham Mondal",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025012",
      name: "JOY DEY",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025013",
      name: "Dibyendu Koley ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025014",
      name: "Preyashi Biswas ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025015",
      name: "Nabajyoti Nag ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025016",
      name: "Rishav Prasad ",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025017",
      name: "Nabanita Barai",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025018",
      name: "Abir Majumder",
      issuedOn: "05-05-2025",
    },

    {
      id: "CT2025019",
      name: "Bhargabi Mukherjee",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025020",
      name: "Ayan Roy",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025021",
      name: "Debojit Sarkar",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025022",
      name: "Suprakash Halder",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025023",
      name: "Rohan Kumar",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025024",
      name: "Saurav Kewat",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025025",
      name: "Ishan Mishra",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025026",
      name: "Chiradeep Mukherjee",
      issuedOn: "05-05-2025",
    },
    {
      id: "CT2025027",
      name: "Himanshu Adhikary",
      issuedOn: "05-05-2025",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Arya Ghosh",
      position: "Incharge",
      role: "I am Arya Ghosh 2nd year ECE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Arya Ghosh.jpg"),
    },
    {
      id: 2,
      name: "Dibyendu Koley",
      position: "Co-incharge",
      role: "I am Dibyendu Koley 2nd year ECE from Cooch Behar Government engineering college ",
      photo: require("./Member_photos/HDR.jpg"),
    },
    {
      id: 3,
      name: "Anwesha Ghosh",
      position: "Social media handler ",
      role: "I am Anwesha Ghosh 2nd year ECE from Cooch Behar Government engineering college ",
      photo: require("./Member_photos/Anwesha Ghosh.jpg"),
    },
    {
      id: 4,
      name: "Diya Ghosh",
      position: "Reporter, content writer",
      role: "I am Diya Ghosh 2nd year EE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Diya Ghosh.jpg"),
    },
    {
      id: 5,
      name: "Himanshu Adhikary",
      position: "Photographer",
      role: "I am Himanshu Adhikary 2nd year EE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Himanshu Adhikary.jpg"),
    },

    {
      id: 6,
      name: "Joydeep Mitra",
      position: "Reporter",
      role: "I am Joydeep Mitra 2nd year ME from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Joydeep Mitra.jpg"),
    },

    {
      id: 7,
      name: "Shubhojit Hazra",
      position: "Content Writer",
      role: "I am Shubhojit Hazra 2nd year EE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/SHUBHOJIT HAZRA.jpg"),
    },
    {
      id: 8,
      name: "Nabajyoti Nag",
      position: "Graphic Designer",
      role: "I am Nabajyoti Nag 2nd year ECE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Nabajyoti Nag.jpg"),
    },
    {
      id: 9,
      name: "Tamanna Mishra",
      position: "Tech member",
      role: "I am Tamanna Mishra 2nd year CSE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Tamanna.jpg"),
    },
    {
      id: 10,
      name: "Satyajit Roy",
      position: "Tech member",
      role: "I am Satyajit Roy 1st year CSE from Cooch Behar Government engineering college ",
      photo: require("./Member_photos/me1.jpg"),
    },
    {
      id: 11,
      name: "Debojit Sarkar",
      position: "Graphic Designer",
      role: "I am Debojit Sarkar 1st year CSE from Cooch Behar Government engineering college ",
      photo: require("./Member_photos/Debojit Sarkar.jpg"),
    },
    {
      id: 12,
      name: "Rishav Prasad",
      position: "Social Media Handler ",
      role: "I am Rishav Prasad 1st year CSE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Rishav Prasad.jpg"),
    },
    {
      id: 13,
      name: "Subham Saha",
      position: "Tech member",
      role: "I am Subham Saha 1st year CSE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Subham Saha.webp"),
    },
    {
      id: 14,
      name: "Bhargabi Mukherjee",
      position: "Content Writer",
      role: "I am Bhargabi Mukherjee 1st year EE from Cooch Behar Government engineering college ",
      photo: require("./Member_photos/Bhargabi.jpg"),
    },
    {
      id: 15,
      name: "Kankana Sikder ",
      position: "Content Writer",
      role: "I am Kankana Sikder 1st year CE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Kankana Sikder.jpg"),
    },
    {
      id: 16,
      name: "Ayan Roy",
      position: "Graphic Designer",
      role: "I am Ayan Roy 1st year CSE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/AYAN ROY.jpg"),
    },
    {
      id: 17,
      name: "Parthiv Bania",
      position: "Tech member",
      role: "I am Parthiv Bania 1st year CSE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/Parthiv.jpg"),
    },
    {
      id: 18,
      name: "Nirupam Konar",
      position: "Video editor",
      role: "I am Nirupam Konar 1st year ECE from Cooch Behar Government engineering college",
      photo: require("./Member_photos/NIRUPAM KONAR.jpg"),
    },
    {
      id: 19,
      name: "Soumadeep Das",
      position: "Cartoonist",
      role: "I am Soumadeep Das 1st year CSE from Cooch Behar Government engineering college  ",
      photo: require("./Member_photos/Soumadeep Das.jpg"),
    },
    {
      id: 20,
      name: "Adityava Gangopadhyay",
      position: "Content Writer",
      role: "I am Adityava Gangopadhyay 1st year CSE from Cooch Behar Government engineering college  ",
      photo: require("./Member_photos/Aditav.jpg"),
    },
  ];
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendClick = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const updatedEmails = [...emails, email];

    setEmails(updatedEmails);

    localStorage.setItem("subscribedEmails", JSON.stringify(updatedEmails));

    alert(`Thank you! Your email (${email}) has been saved.`);
    setEmail("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  useEffect(() => {
    if (verificationResult) {
      const timer = setTimeout(() => {
        setVerificationResult(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [verificationResult]);

  const handleVerifyCertificate = () => {
    if (!certificateId) {
      setVerificationResult({
        success: false,
        message: "Please enter a certificate ID",
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      const foundCertificate = sampleCertificates.find(
        (cert) => cert.id === certificateId.toUpperCase()
      );

      if (foundCertificate) {
        setVerificationResult({
          success: true,
          message: "Certificate verified successfully!",
          data: foundCertificate,
        });
      } else {
        setVerificationResult({
          success: false,
          message:
            "Certificate ID is worng. Please check the ID and try again.",
        });
      }

      setIsVerifying(false);
      setCertificateId("");
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationStartTime = null;
    const scrollSpeed = 50;

    const animateScroll = (timestamp) => {
      if (!animationStartTime) animationStartTime = timestamp;
      const elapsed = timestamp - animationStartTime;
      const scrollDistance = (elapsed / 1000) * scrollSpeed;

      scrollContainer.scrollLeft = scrollDistance;

      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
        animationStartTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animateScroll);
    };

    animationRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

 return (
  <div className="team-container">
    <div className="team-header">
      <h1 className="main-title">Introducing our TEAM</h1>
    </div>

    {/* Swiper Container */}
    <div className="team-swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          300: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        }}
      >
        {teamMembers.map((member) => (
          <SwiperSlide key={member.id}>
            <div className="member-card">
              <div className="member-image-container">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="member-photo"
                />
              </div>
              <h2 className="member-name">{member.name}</h2>
              <p className="member-position">{member.position}</p>
              <p className="member-role">
                {member.role.slice(0, 90)}
                {member.role.length > 90 && "..."}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

      <div className="join-section">
        <div className="join-container">
          <div className="join-form">
            <h3 className="join-title">
              Be A Part Of Us <i className="fa-solid fa-hand-point-up"></i>
            </h3>
            <div className="join-names">
              <input
                className="email_sent"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSendClick}
                className={isSubmitted ? "submit-success" : ""}
              >
                {isSubmitted ? (
                  <>
                    <i className="fas fa-check"></i> Sent!
                  </>
                ) : (
                  "Send"
                )}
              </button>
            </div>
            {isSubmitted && (
              <p className="submit-message">
                Thank you for joining us! We'll reach you as soon as possible.
              </p>
            )}
          </div>

          <div className="verify-certificate">
            <h3 className="verify-title">
              Verify Your Certificate{" "}
              <i className="fa-solid fa-certificate"></i>
            </h3>
            <div className="verify-input">
              <input
                type="text"
                placeholder="Enter Certificate ID"
                className="certificate-input"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
              />
              <button
                className="verify-button"
                onClick={handleVerifyCertificate}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <span className="loading-spinner"></span>
                    Verifying...
                  </>
                ) : (
                  "Verify Certificate"
                )}
              </button>
            </div>

            {verificationResult && (
              <div
                className={`verification-result ${
                  verificationResult.success ? "success" : "error"
                }`}
              >
                <p>
                  <i
                    className={`fas ${
                      verificationResult.success
                        ? "fa-check-circle success-icon"
                        : "fa-times-circle error-icon"
                    }`}
                  ></i>
                  {verificationResult.message}
                </p>

                {verificationResult.success && verificationResult.data && (
                  <div className="certificate-details">
                    <p>
                      <strong>Name:</strong> {verificationResult.data.name}
                    </p>
                    <p>
                      <strong>Issued On:</strong>{" "}
                      {verificationResult.data.issuedOn}
                    </p>
                    <p>
                      {verificationResult.data.name} is Verified by CGEC-TIMES{" "}
                      <i className="fas fa-check-circle success-icon"></i>
                    </p>
                  </div>
                )}
              </div>
            )}

            <p className="verify-note">
              Check the authenticity of your CGEC Times certificates
            </p>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">Support</h4>
          <div className="links">
            <ul className="footer-links">
              <li>
                <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html">
                  <i className="fa-brands mx-1 fa-rocketchat"></i>chat
                </a>
              </li>
              <li>
                <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html">
                  <i className="fa-solid mx-1 fa-phone"></i>contact
                </a>
              </li>
              <li>
                <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html">
                  <i className="fa-solid mx-1 fa-file"></i>Documentation
                </a>
              </li>
              <li>
                <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html">
                  <i className="fa-solid mx-1 fa-question"></i>FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="clg d-flex">
          <img className="ctLogo" src={clgLogo} alt="" />
          <img className="cgectimes" src={logo} alt="" />
          <div className="social d-flex">
            <a
              style={{ textDecoration: "none" }}
              href="https://www.linkedin.com/company/the-cgec-times/"
            >
              <i className="fa-brands fa-linkedin-in mx-2 linkedIn social-icon"></i>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://www.instagram.com/the_cgec_times/"
            >
              <i className="fa-brands fa-instagram mx-2 instaGram social-icon"></i>
            </a>
            <a
              style={{ textDecoration: "none" }}
              href="https://www.facebook.com/people/The-CGEC-TIMES/100088137340330/"
            >
              <i className="fa-brands fa-facebook-f mx-2 faceBook social-icon"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <div className="links">
            <ul className="footer-links">
              <li>
                <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html">
                  <i className="fa-brands mx-1 fa-servicestack"></i>terms and
                  condition
                </a>
              </li>
              <li>
                <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html">
                  paragraphs
                </a>
              </li>
              <li>
                <a href="https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html">
                  <i className="fa-solid mx-1 fa-cookie"></i>Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        
      </div>
      <div className="copyright bg-dark" >
          <u>© 2025- Present The CGEC Times || Made by React with Love❤️ || All rights reserved.</u>
        </div>
    </div>
    
  );
};

export default TeamPage;

// import React, { useState, useEffect } from "react";
// import "./TeamPage.css";

// const TeamPage = () => {
//   const [email, setEmail] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [emails, setEmails] = useState([]);

//   // Load saved emails on component mount
//   useEffect(() => {
//     const savedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
//     setEmails(savedEmails);
//   }, []);

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleSendClick = () => {
//     if (!email) {
//       alert("Please enter your email address");
//       return;
//     }

//     if (!validateEmail(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     const updatedEmails = [...emails, email];
//     setEmails(updatedEmails);
//     localStorage.setItem("subscribedEmails", JSON.stringify(updatedEmails));

//     alert(`Thank you! Your email (${email}) has been saved.`);
//     setEmail("");
//     setIsSubmitted(true);
//     setTimeout(() => setIsSubmitted(false), 3000);
//   };

//   // Optional: Reset all emails
//   const resetEmails = () => {
//     if (window.confirm("Are you sure you want to delete all saved emails?")) {
//       setEmails([]);
//       localStorage.removeItem("subscribedEmails");
//     }
//   };

//   return (
//     <div className="team-container">
//       {/* ... other existing code ... */}

//       <div className="join-form">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={handleSendClick}>
//           {isSubmitted ? "Submitted!" : "Submit"}
//         </button>
//       </div>

//       {/* Saved emails list */}
//       <div className="saved-emails-section">
//         <h3>Subscribed Emails ({emails.length})</h3>
//         <ul>
//           {emails.map((email, index) => (
//             <li key={index}>{email}</li>
//           ))}
//         </ul>
//         <button
//           onClick={resetEmails}
//           style={{ background: "red", color: "white", marginTop: "10px" }}
//         >
//           Clear All Emails
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeamPage;
