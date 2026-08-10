import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./About.css";
import backgroundImage from "./photos/cgec_acdemic.jpeg";
import clgLogo from "./photos/clgLogo.png";
import { supabase } from "../supabase";

// 📌 আপনার ওয়েবসাইট ওপেন হওয়ার সাথে যে পোস্টারটি দেখাবে সেটির ছবি এখানে ইম্পোর্ট করুন
// (বা সরাসরি অনলাইন লিঙ্কের URL ব্যবহার করতে পারেন)
import mainPosterImg from "./photos/sih_poster.jpeg"; 

const BackgroundBox = () => {
  // ===== 1. Main Website Pop-up Poster State =====
  const [showMainPoster, setShowMainPoster] = useState(true);

  // ===== 2. Database Events & Admin States =====
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [activeDate, setActiveDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(0);

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsAdmin(true);
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata"
    }).format(new Date());

    const { data, error } = await supabase
      .from("events_notice")
      .select("*")
      .eq("active_date", today)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data || []);
    }
  };

  const handleOpenAdminModal = (event = null) => {
    if (event) {
      setTitle(event.title || "");
      setMessage(event.message || "");
      setImage(event.image || "");
      setActiveDate(event.active_date || "");
      setEditingId(event.id);
    } else {
      setTitle("");
      setMessage("");
      setImage("");
      setActiveDate("");
      setEditingId(null);
    }
    setShowAdminModal(true);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!title || !message || !activeDate) return;

    if (editingId) {
      await supabase
        .from("events_notice")
        .update({
          title,
          message,
          image: image || null,
          active_date: activeDate
        })
        .eq("id", editingId);
    } else {
      await supabase
        .from("events_notice")
        .insert([
          {
            title,
            message,
            image: image || null,
            active_date: activeDate
          }
        ]);
    }

    setShowAdminModal(false);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice/event?")) {
      await supabase
        .from("events_notice")
        .delete()
        .eq("id", id);

      fetchEvents();

      if (currentEvent > 0) {
        setCurrentEvent(currentEvent - 1);
      }
    }
  };

  return (
    <div className="container-fluid p-0 about-wrapper">
      
      {/* ===== 🎯 MAIN WEBSITE POP-UP POSTER (PAGE LOAD-E OPEN HOBE) ===== */}
      {showMainPoster && (
        <div className="sih-fullscreen-overlay">
          {/* Top Right Floating Close Button */}
          <button 
            className="sih-close-btn" 
            onClick={() => setShowMainPoster(false)} 
            aria-label="Close"
          >
            ✕ Close
          </button>

          {/* Poster Box */}
          <div className="sih-poster-wrapper">
            <img 
              src={mainPosterImg} 
              alt="Website Announcement Poster" 
              className="sih-fullscreen-img"
            />
          </div>
        </div>
      )}

      {/* Admin Control Bar */}
      {isAdmin && (
        <div className="container py-3 text-end">
          <Button 
            variant="warning" 
            className="fw-bold"
            onClick={() => handleOpenAdminModal()}
          >
            + Add Event / Notice
          </Button>
        </div>
      )}

      {/* ===== MAIN PAGE BACKGROUND & CONTENT ===== */}
      <div
        className="background-box d-flex align-items-center py-5 position-relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={clgLogo} alt="CGEC Logo" className="college-logo" />
        <div className="overlay"></div>

        {/* Dynamic Events Notice (Sticky Note style in Background) */}
        {events.length > 0 && (
          <div
            className="sticky-note-wrapper"
            onClick={() =>
              setCurrentEvent(
                currentEvent === events.length - 1 ? 0 : currentEvent + 1
              )
            }
          >
            <div className="pin"></div>

            {events[currentEvent]?.image && (
              <img
                src={events[currentEvent].image}
                alt=""
                className="sticky-note-image mb-2"
              />
            )}

            <div className="sticky-note-content">
              <h4>{events[currentEvent]?.title}</h4>
              <p>{events[currentEvent]?.message}</p>

              {events.length > 1 && (
                <div className="tap-text">
                  Tap to view next event →
                </div>
              )}

              {isAdmin && (
                <div
                  className="d-flex gap-2 mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOpenAdminModal(events[currentEvent])}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(events[currentEvent].id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="container position-relative z-1">
          <div className="row justify-content-center g-4">
            
            {/* About CGEC Times */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="about-section p-4 shadow-lg text-center h-100">
                <h2 className="d-inline-block bg-white text-dark px-4 py-2 rounded-pill h4 mb-4 fw-bold">
                  About CGEC Times
                </h2>

                <div className="section-content text-white fw-bold">
                  <p>
                    Welcome to CGEC Times, the official newspaper club of Cooch
                    Behar Government Engineering College. Established in 2022, we
                    are dedicated to covering all major events, achievements,
                    and activities happening across our campus.
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
            </div>

            {/* About CGEC */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="about-section p-4 shadow-lg text-center h-100">
                <h2 className="d-inline-block bg-white text-dark px-4 py-2 rounded-pill h4 mb-4 fw-bold">
                  About CGEC
                </h2>

                <div className="section-content text-white fw-bold">
                  <p>
                    Cooch Behar Government Engineering College (CGEC) is located
                    in a prime location in Cooch Behar District, easily accessible
                    from all parts of the city.
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
      </div>

      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Event Notice" : "Add Event Notice"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveEvent}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Message / Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Poster Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/poster.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Active Date</Form.Label>
              <Form.Control
                type="date"
                value={activeDate}
                onChange={(e) => setActiveDate(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdminModal(false)}>
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              {editingId ? "Update Event" : "Save Event"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </div>
  );
};

export default BackgroundBox;