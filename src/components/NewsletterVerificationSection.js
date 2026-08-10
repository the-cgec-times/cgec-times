import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./NewsletterVerificationSection.css";

const NewsletterVerificationSection = ({ email, setEmail }) => {
  const [loading, setLoading] = useState(false);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwB9kK26qIIDRXts8JJWGgH-PuFJ2aUXvdgLjCd_OHDXULDue8GdjtBRE-LStdQSAqR/exec";

  const handleNewsletter = async () => {
    const userEmail = email.trim().toLowerCase();

    if (!userEmail || !userEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const subscribedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    if (subscribedEmails.includes(userEmail)) {
      alert("This email is already subscribed!");
      return;
    }

    try {
      setLoading(true);

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      await emailjs.send(
        "service_wnc33iv",
        "template_vy9ksff",
        {
          user_email: userEmail,
          reply_to: "thecgectimesofficial@gmail.com",
        },
        "-f9Qt_Lv1q81csG8s"
      );

      const updatedEmails = [...subscribedEmails, userEmail];
      localStorage.setItem("subscribedEmails", JSON.stringify(updatedEmails));

      alert("Subscription successful! Please check your mail");
      setEmail("");
    } catch (error) {
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="newsletter-card text-center">
              <h4 className="section-title">Newsletter</h4>
              <p className="newsletter-subtext">
                Subscribe to CGEC TIMES for latest updates, events & news
              </p>
              <div className="input-group-custom mt-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button onClick={handleNewsletter} disabled={loading}>
                  {loading ? "Joining..." : "Join"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterVerificationSection;