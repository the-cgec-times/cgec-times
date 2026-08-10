import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase"; 

const AcademicEventDetailsPage = () => {
  const { eventType, eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const fetchEvent = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("academic_events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (!error && data) {
      setEvent(data);
      setEditData({ 
        ...data, 
        highlights: data.highlights?.join(", "), 
        winner1: Array.isArray(data.winners?.first) ? data.winners.first.join(", ") : data.winners?.first || "",
        winner2: Array.isArray(data.winners?.second) ? data.winners.second.join(", ") : data.winners?.second || "",
        winner3: Array.isArray(data.winners?.third) ? data.winners.third.join(", ") : data.winners?.third || ""
      });
    }
    setLoading(false);
  }, [eventId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvent();
  }, [fetchEvent]);

  const handleUpdate = async () => {
    const winnersJSON = {
      first: editData.winner1 ? editData.winner1.split(",").map(s => s.trim()) : null,
      second: editData.winner2 ? editData.winner2.split(",").map(s => s.trim()) : null,
      third: editData.winner3 ? editData.winner3.split(",").map(s => s.trim()) : null
    };

    const { error } = await supabase.from("academic_events").update({
      title: editData.title,
      description: editData.description,
      organizer: editData.organizer,
      image_url: editData.image_url,
      status: editData.status,
      highlights: typeof editData.highlights === 'string' ? editData.highlights.split(",").map(s => s.trim()) : editData.highlights,
      winners: winnersJSON
    }).eq("id", eventId);
    
    if (!error) {
      setIsEditing(false);
      fetchEvent();
      alert("Updated Successfully!");
    }
  };

  if (loading) return <div className="text-center py-5" style={{marginTop: "120px"}}>Loading...</div>;

  if (!event) return (
    <div className="container text-center py-5" style={{ marginTop: "120px" }}>
      <h2 className="fw-bold text-danger">Event Not Found</h2>
      <Link to={`/academic-events/${eventType}`} className="btn btn-primary mt-3">Go Back</Link>
    </div>
  );

  return (
    <div className="container py-5" style={{ marginTop: "100px", maxWidth: "1100px" }}>
      <div className="card shadow-lg border-0 rounded-4">
        
        {isEditing ? (
          <div className="card-body p-4 p-md-5">
            <h4 className="fw-bold mb-4 text-primary">Edit Event Details</h4>
            <input type="text" className="form-control mb-3" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} placeholder="Title" />
            <textarea className="form-control mb-3" rows="5" value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})} placeholder="Description" />
            
            <label className="small fw-bold">Winners (Name, Year, Dept)</label>
            <input type="text" className="form-control mb-2" value={editData.winner1} onChange={(e) => setEditData({...editData, winner1: e.target.value})} placeholder="1st Place" />
            
            <div className="d-flex gap-2 mt-4">
              <button onClick={handleUpdate} className="btn btn-primary rounded-pill px-5">Save Changes</button>
              <button onClick={() => setIsEditing(false)} className="btn btn-light rounded-pill px-5">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-light text-center p-3 position-relative">
              <img
                src={event.image_url || "/placeholder.jpg"}
                alt={event.title}
                className="img-fluid"
                style={{ maxHeight: "500px", objectFit: "contain", borderRadius: "12px" }}
              />
              {isAdmin && (
                <button onClick={() => setIsEditing(true)} className="btn btn-warning btn-sm position-absolute rounded-pill shadow" style={{top: "20px", right: "20px"}}>
                  <i className="fas fa-edit me-1"></i> Edit Details
                </button>
              )}
            </div>

            <div className="card-body p-4 p-md-5">
              <span className={`badge mb-3 px-3 py-2 ${event.status === "Upcoming" ? "bg-warning text-dark" : "bg-success"}`} style={{ fontSize: "0.9rem", borderRadius: "20px" }}>
                {event.status}
              </span>

              <h1 className="fw-bold mb-3">{event.title}</h1>
              <p className="text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>{event.description}</p>
              <hr />

              <div className="row text-muted mb-4 gy-2">
                <div className="col-md-4"><i className="fas fa-calendar-alt me-2"></i><strong>Date:</strong> {event.date}</div>
                <div className="col-md-4"><i className="fas fa-map-marker-alt me-2"></i><strong>Venue:</strong> {event.venue}</div>
                <div className="col-md-4"><i className="fas fa-university me-2"></i><strong>Organizer:</strong> {event.organizer}</div>
              </div>

              {/* Highlights Section */}
              {event.highlights && event.highlights.length > 0 && (
                <div className="mb-4">
                  <h5 className="fw-bold">✨ Highlights</h5>
                  <ul>{event.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
                </div>
              )}

              {/* Winners Section */}
              {event.status === "Completed" && event.winners && (
                <div className="mt-4" style={{ background: "#f8f9fa", padding: "20px", borderRadius: "12px", borderLeft: "5px solid #198754" }}>
                  <h5 className="fw-bold mb-3">🏆 Winners</h5>
                  {["first", "second", "third"].map((rank, idx) => {
                    const winner = event.winners[rank];
                    const labels = ["🥇 1st Place", "🥈 2nd Place", "🥉 3rd Place"];
                    if (!winner) return null;
                    return (
                      <div key={rank} className="mb-2">
                        <strong>{labels[idx]}:</strong> {Array.isArray(winner) ? `${winner[0]} (${winner[1]} - ${winner[2]})` : winner}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <button onClick={() => navigate(-1)} className="btn btn-outline-secondary rounded-pill px-4">← Back to Events</button>
                {event.status === "Upcoming" && event.register_link && (
                  <a href={event.register_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded-pill px-5 fw-bold shadow-sm">Register Now</a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcademicEventDetailsPage;