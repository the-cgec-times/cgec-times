
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { events } from "../data/event";

const AllEventsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ marginTop: "160px", marginBottom: "80px" }}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold">All Previous Events</h1>
        <button onClick={() => navigate(-1)} className="btn btn-dark">Back</button>
      </div>

      <div className="row g-4">
        {events.previous.map((event) => (
          <div key={event.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <img 
                src={event.image} 
                className="card-img-top" 
                alt={event.name} 
                style={{ height: "200px", objectFit: "cover" }} 
              />
              <div className="card-body">
                <h5 className="fw-bold text-primary">{event.name}</h5>
                <p className="small text-muted mb-2">
                  <i className="fas fa-calendar-alt me-2"></i>{event.date}
                </p>
                <p className="card-text small text-secondary">
                  {event.description.slice(0, 100)}...
                </p>
                <Link to={`/event-details/${event.id}`} className="btn btn-sm btn-outline-primary w-100">
                  Read Full Recap
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;