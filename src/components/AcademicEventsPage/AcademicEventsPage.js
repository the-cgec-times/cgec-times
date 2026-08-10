import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabase";

const AcademicEventsPage = () => {
  const { eventType } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const metaConfigs = {
    techFest: {
      name: "ByteBurst",
      icon: "fas fa-rocket",
      description: "The annual technical extravaganza of CGEC where innovation meets implementation.",
      categories: ["Tech Exhibition", "Graphic Designing", "AutoCAD 2D", "Techno Commercial Project", "Code-a-Thon", "Hackathon", "Tech&Apti Quiz", "PES", "Prompt Competition"]
    },
    innovision: {
      name: "Technovista",
      icon: "fas fa-lightbulb",
      description: "Innovision is CGEC’s innovation & startup focused event celebrating creativity and ideas.",
      categories: ["Tech Quiz", "Code-A-Thon", "CircuitQuest", "CraftyCAD", "devDraw"]
    }
  };

  const currentMeta = metaConfigs[eventType] || { name: eventType, icon: "fas fa-university", categories: [], description: "" };

  const [formData, setFormData] = useState({
    title: "", description: "", date: "", venue: "", organizer: "",
    image_url: "", status: "Upcoming", register_link: "", highlights: "", 
    winner1: "", winner2: "", winner3: ""
  });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("academic_events")
      .select("*")
      .eq("event_type", eventType)
      .order("created_at", { ascending: false });

    if (!error) setEvents(data);
    setLoading(false);
  }, [eventType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvents();
  }, [fetchEvents]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const winnersJSON = {
      first: formData.winner1 || null,
      second: formData.winner2 || null,
      third: formData.winner3 || null
    };

    const { error } = await supabase.from("academic_events").insert([
      {
        event_type: eventType,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        venue: formData.venue,
        organizer: formData.organizer,
        image_url: formData.image_url,
        status: formData.status,
        register_link: formData.register_link,
        highlights: formData.highlights ? formData.highlights.split(",").map(s => s.trim()) : [],
        winners: winnersJSON
      },
    ]);

    if (!error) {
      fetchEvents();
      setFormData({ 
        title: "", description: "", date: "", venue: "", organizer: "", 
        image_url: "", status: "Upcoming", register_link: "", highlights: "", 
        winner1: "", winner2: "", winner3: "" 
      });
      alert("Event added successfully!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this event?")) {
      const { error } = await supabase.from("academic_events").delete().eq("id", id);
      if (!error) fetchEvents();
    }
  };

  const renderCards = (eventList) =>
    eventList.length > 0 ? (
      eventList.map((event) => (
        <div key={event.id} className="col-md-6 col-xl-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <img src={event.image_url || "/placeholder.jpg"} alt={event.title} className="w-100" style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body d-flex flex-column">
              <h5 className="fw-bold">{event.title}</h5>
              <p className="text-muted small flex-grow-1">{event.description?.substring(0, 90)}...</p>
              <div className="d-flex gap-2 mt-auto pt-3">
                <Link to={`/academic-events/${eventType}/${event.id}`} className="btn btn-outline-primary btn-sm rounded-pill w-100">View Details</Link>
                {isAdmin && <button onClick={() => handleDelete(event.id)} className="btn btn-danger btn-sm rounded-pill"><i className="fas fa-trash"></i></button>}
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-12 text-center text-muted py-4">No events available</div>
    );

  if (loading) return <div className="text-center py-5" style={{marginTop:"120px"}}>Loading...</div>;

  return (
    <div className="container-fluid py-5" style={{ marginTop: "90px" }}>
      <div className="row">
        {/* Sidebar with Full Admin Form */}
        <div className="col-lg-4 mb-4">
          {isAdmin && (
            <div className="card p-4 shadow-sm rounded-4 mb-4 border-0 bg-light">
              <h5 className="fw-bold text-primary mb-4">Admin: Add Event</h5>
              <form onSubmit={handleAddEvent}>
                <input type="text" name="title" placeholder="Event Title" className="form-control mb-2" onChange={handleInputChange} value={formData.title} required />
                <textarea name="description" placeholder="Description" className="form-control mb-2" onChange={handleInputChange} value={formData.description} rows="3"></textarea>
                <input type="text" name="organizer" placeholder="Organizer Name" className="form-control mb-2" onChange={handleInputChange} value={formData.organizer} />
                <input type="text" name="venue" placeholder="Venue" className="form-control mb-2" onChange={handleInputChange} value={formData.venue} />
                <input type="date" name="date" className="form-control mb-2" onChange={handleInputChange} value={formData.date} />
                <input type="text" name="image_url" placeholder="Image URL (Direct link)" className="form-control mb-2" onChange={handleInputChange} value={formData.image_url} />
                <input type="text" name="register_link" placeholder="Registration Link (if any)" className="form-control mb-2" onChange={handleInputChange} value={formData.register_link} />
                
                <select name="status" className="form-select mb-2" onChange={handleInputChange} value={formData.status}>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>

                <div className="p-2 border rounded mb-2 bg-white">
                  <small className="text-muted fw-bold">Winners (Optional)</small>
                  <input type="text" name="winner1" placeholder="1st: Name, Year, Dept" className="form-control form-control-sm mb-1 mt-1" onChange={handleInputChange} value={formData.winner1} />
                  <input type="text" name="winner2" placeholder="2nd: Name, Year, Dept" className="form-control form-control-sm mb-1" onChange={handleInputChange} value={formData.winner2} />
                  <input type="text" name="winner3" placeholder="3rd: Name, Year, Dept" className="form-control form-control-sm" onChange={handleInputChange} value={formData.winner3} />
                </div>

                <input type="text" name="highlights" placeholder="Highlights (comma separated)" className="form-control mb-3" onChange={handleInputChange} value={formData.highlights} />
                
                <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">Upload Event</button>
              </form>
            </div>
          )}
          
          <div className="bg-white shadow-sm rounded-4 p-4 sticky-top" style={{ top: "110px" }}>
            <div className="text-center mb-4">
              <i className={`${currentMeta.icon} fa-3x text-primary mb-3`}></i>
              <h4 className="fw-bold">{currentMeta.name}</h4>
              <p className="text-muted small">{currentMeta.description}</p>
            </div>
            <h6 className="fw-bold mb-3 text-uppercase text-secondary" style={{fontSize:"0.75rem"}}>Event Categories</h6>
            <div className="d-flex flex-wrap gap-2">
              {currentMeta.categories.map((cat, i) => (
                <span key={i} className="badge bg-light text-dark border px-3 py-2 rounded-pill small fw-semibold">{cat}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="col-lg-8">
          <h4 className="fw-bold mb-3 text-primary"><u>Upcoming Events</u></h4>
          <div className="row g-4 mb-5">
            {renderCards(events.filter(e => e.status === "Upcoming"))}
          </div>
          <h4 className="fw-bold mb-3 text-primary"><u>Completed Events</u></h4>
          <div className="row g-4">
            {renderCards(events.filter(e => e.status === "Completed"))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicEventsPage;