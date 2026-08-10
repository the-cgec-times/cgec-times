import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import "./EventSection.css";

const EventsSection = () => {
  const [eventData, setEventData] = useState({ upcoming: [], previous: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllPrevious, setShowAllPrevious] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fullDetails: "",
    image: "",
    category: "upcoming",
    date: "",
    venue: "",
    registration_link: ""
  });

  useEffect(() => {
    fetchEvents();
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*");
    if (data) {
      setEventData({
        upcoming: data.filter(e => e.category === "upcoming"),
        previous: data.filter(e => e.category === "previous")
      });
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setFormData({ name: "", description: "", fullDetails: "", image: "", category: "upcoming", date: "", venue: "", registration_link: "" });
    setShowForm(true);
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setEditId(event.id);
    setFormData(event);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await supabase.from("events").delete().eq("id", id);
      fetchEvents();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await supabase.from("events").update(formData).eq("id", editId);
    } else {
      await supabase.from("events").insert([formData]);
    }
    fetchEvents();
    setShowForm(false);
  };

  return (
    <section className="events-outer-wrapper py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-2">OUR EVENTS</h1>
          <div className="mx-auto rounded-pill" style={{ width: '70px', height: '4px', background: '#b10e29' }}></div>
          {isAdmin && <button className="btn btn-success rounded-pill px-4 mt-4 shadow-sm" onClick={handleAdd}>Add New Event</button>}
        </div>

        {showForm && (
          <div className="custom-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="bg-white p-4 rounded-4 shadow-lg" style={{ maxWidth: '500px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3 className="fw-bold mb-3">{isEditing ? "Edit Event" : "Create Event"}</h3>
              <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" placeholder="Event Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                <textarea className="form-control mb-2" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                <textarea className="form-control mb-2" placeholder="Full Details" value={formData.fullDetails} onChange={e => setFormData({ ...formData, fullDetails: e.target.value })} />
                <input className="form-control mb-2" placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                <input className="form-control mb-2" placeholder="Registration Link" value={formData.registration_link} onChange={e => setFormData({ ...formData, registration_link: e.target.value })} />
                <input className="form-control mb-2" placeholder="Date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                <input className="form-control mb-2" placeholder="Venue" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} />
                <select className="form-select mb-3" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  <option value="upcoming">Upcoming</option>
                  <option value="previous">Previous</option>
                </select>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary w-100">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="row g-4">
          {/* UPCOMING COLUMN */}
          <div className="col-md-6">
            <h4 className="fw-bold text-danger mb-3"><u>Upcoming</u></h4>
            {(showAllUpcoming ? eventData.upcoming : eventData.upcoming.slice(0, 3)).map(event => (
              <div key={event.id} className="card border-0 shadow rounded-4 p-3 mb-3" style={{ borderLeft: "5px solid #b10e29" }}>
                <h5 className="fw-bold">{event.name}</h5>
                <p className="small text-muted mb-2">{event.description}</p>
                <Link to={`/event-details/${event.id}`} className="btn btn-sm btn-danger rounded-pill px-3 mt-2" style={{width: 'fit-content'}}>Details →</Link>
                {isAdmin && (
                  <div className="mt-2">
                    <button onClick={() => handleEdit(event)} className="btn btn-link btn-sm text-warning p-0 me-2 text-decoration-none">Edit</button>
                    <button onClick={() => handleDelete(event.id)} className="btn btn-link btn-sm text-danger p-0 text-decoration-none">Delete</button>
                  </div>
                )}
              </div>
            ))}
            {eventData.upcoming.length > 3 && (
              <button className="btn btn-outline-danger rounded-pill px-4 mt-2" onClick={() => setShowAllUpcoming(!showAllUpcoming)}>
                {showAllUpcoming ? "Show Less" : "More"}
              </button>
            )}
          </div>

          {/* PREVIOUS COLUMN */}
          <div className="col-md-6">
            <h4 className="fw-bold text-secondary mb-3"><u>Previous</u></h4>
            {(showAllPrevious ? eventData.previous : eventData.previous.slice(0, 3)).map(event => (
              <div key={event.id} className="card border-0 shadow rounded-4 p-3 mb-3" style={{ borderLeft: "5px solid #6c757d" }}>
                <h5 className="fw-bold">{event.name}</h5>
                <p className="small text-muted mb-2">{event.description}</p>
                <Link to={`/event-details/${event.id}`} className="btn btn-sm btn-secondary rounded-pill px-3 mt-2" style={{width: 'fit-content'}}>Recap →</Link>
                {isAdmin && (
                  <div className="mt-2">
                    <button onClick={() => handleEdit(event)} className="btn btn-link btn-sm text-warning p-0 me-2 text-decoration-none">Edit</button>
                    <button onClick={() => handleDelete(event.id)} className="btn btn-link btn-sm text-danger p-0 text-decoration-none">Delete</button>
                  </div>
                )}
              </div>
            ))}
            {eventData.previous.length > 3 && (
              <button className="btn btn-outline-secondary rounded-pill px-4 mt-2" onClick={() => setShowAllPrevious(!showAllPrevious)}>
                {showAllPrevious ? "Show Less" : "More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;