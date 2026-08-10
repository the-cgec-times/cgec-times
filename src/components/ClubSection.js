import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ClubSection.css";
import { clubs as initialClubs } from "../data/club";

const ClubsSection = () => {
  const [clubs, setClubs] = useState(initialClubs);
  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    console.log("Admin Status from Storage:", adminStatus); 
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClubId, setCurrentClubId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: ""
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setClubs(clubs.filter((club) => club.id !== id));
    }
  };

  const handleEditClick = (club) => {
    setIsEditing(true);
    setCurrentClubId(club.id);
    setFormData({
      name: club.name,
      description: club.description,
      logo: club.logo || ""
    });
    setShowForm(true);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({ name: "", description: "", logo: "" });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setClubs(clubs.map(c => c.id === currentClubId ? { ...c, ...formData } : c));
    } else {
      setClubs([...clubs, { id: Date.now(), ...formData }]);
    }
    setShowForm(false);
  };

  return (
    <section className="clubs-outer-wrapper py-5 bg-light">
      <div className="container py-4">
        

        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-dark mb-2 tracking-tight">OUR COMMUNITIES</h2>
          <div className="mx-auto bg-primary rounded-pill" style={{ width: "80px", height: "5px" }}></div>
          
          {isAdmin && (
            <div className="mt-4">
               <button className="btn btn-success rounded-pill px-4 shadow-sm" onClick={handleAddClick}>
                <i className="fas fa-plus me-2"></i> Add New Club
              </button>
            </div>
          )}
        </div>

        {showForm && (
          <div className="custom-modal-overlay">
            <div className="modal-content-wrapper bg-white p-4 rounded-4 shadow-lg">
              <h3 className="fw-bold mb-3 text-dark">{isEditing ? "Edit Club" : "Add New Club"}</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Club Name" className="form-control mb-2" required 
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <textarea placeholder="Club Description" className="form-control mb-2" rows="3" required
                  value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                <input type="text" placeholder="Logo Image URL" className="form-control mb-3"
                  value={formData.logo} onChange={e => setFormData({ ...formData, logo: e.target.value })} />
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary flex-grow-1">{isEditing ? "Update" : "Create"}</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="row g-4">
          {clubs.map((club) => (
            <div key={club.id} className="col-12 col-md-6 col-lg-4 position-relative">
              
              {isAdmin && (
                <div className="admin-actions" style={{ position: 'absolute', top: '10px', right: '25px', zIndex: 100, display: 'flex', gap: '5px' }}>
                  <button className="btn btn-primary btn-sm shadow-sm" style={{ borderRadius: '50%', width: '32px', height: '32px' }} onClick={() => handleEditClick(club)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-danger btn-sm shadow-sm" style={{ borderRadius: '50%', width: '32px', height: '32px' }} onClick={() => handleDelete(club.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              )}

              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 club-card-premium transition-all">
                 
                 <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0 bg-primary bg-gradient rounded-3 d-flex align-items-center justify-content-center overflow-hidden" style={{ width: "55px", height: "55px" }}>
                    {club.logo ? <img src={club.logo} alt={club.name} className="w-100 h-100 object-fit-cover" /> : <span className="h4 mb-0 fw-bold text-white">{club.name.charAt(0)}</span>}
                  </div>
                  <div className="ms-3">
                    <h3 className="h5 fw-bold mb-0">{club.name}</h3>
                  </div>
                </div>
                <div className="card-body p-0">
                  <p className="text-muted small lh-base mb-4 line-clamp-3">{club.description}</p>
                  <Link to={`/club/${club.id}`} className="btn btn-link p-0 text-primary text-decoration-none fw-bold">Explore Club <i className="fas fa-arrow-right ms-1"></i></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;