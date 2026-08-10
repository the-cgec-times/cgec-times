import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clubs as initialClubs } from "../data/club";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaCalendarAlt, FaImages, FaUserPlus, FaMapMarkerAlt, FaEdit, FaTrash, FaPlusCircle, FaTimes, FaSave } from "react-icons/fa";

const ClubDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [club, setClub] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
    
    const foundClub = initialClubs.find((c) => c.id === parseInt(id));
    setClub(foundClub);
  }, [id]);

  if (!club) return <div style={styles.errorContainer}><h2>Club Not Found</h2></div>;

  const openModal = (type, data = null, index = null) => {
    setModalType(type);
    setEditIndex(index);
    setFormData(data || {});
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    let updatedClub = { ...club };

    if (modalType === "Event") {
      if (editIndex !== null) updatedClub.events[editIndex] = formData;
      else updatedClub.events = [...(updatedClub.events || []), formData];
    } 
    else if (modalType === "Leader") {
      if (editIndex !== null) updatedClub.leadership[editIndex] = formData;
      else updatedClub.leadership = [...(updatedClub.leadership || []), formData];
    }
    else if (modalType === "About") {
      updatedClub.description = formData.description;
    }
    else if (modalType === "Club Details") {
      updatedClub.name = formData.name;
    }

    setClub(updatedClub);
    setShowModal(false);
    alert("Changes saved locally!"); 
  };

  const handleDelete = (section, index) => {
    if (window.confirm(`Delete this ${section}?`)) {
      let updatedClub = { ...club };
      if (section === 'Event') updatedClub.events.splice(index, 1);
      if (section === 'Leader') updatedClub.leadership.splice(index, 1);
      if (section === 'Gallery') updatedClub.gallery.splice(index, 1);
      setClub(updatedClub);
    }
  };

  const isSliderRequired = club.leadership && club.leadership.length > 3;

  return (
    <div className="page-wrapper navbar-spacer">
      <style>{`
        .swiper-pagination-bullet-active { background: #0078a8 !important; }
        .swiper-button-next, .swiper-button-prev { color: #0078a8 !important; scale: 0.5; }
        .gallery-item:hover img { transform: scale(1.08); transition: 0.4s; }
        .admin-btn { background: #fff; border: 1px solid #ddd; padding: 5px 8px; border-radius: 6px; cursor: pointer; color: #555; transition: 0.3s; margin-left: 8px; }
        .admin-btn:hover { background: #0078a8; color: #fff; border-color: #0078a8; }
        .delete-btn:hover { background: #dc3545; border-color: #dc3545; color: #fff; }
        .add-btn { background: #0078a8; color: #fff; border: none; padding: 6px 15px; border-radius: 8px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:9999; }
        .modal-box { background:#fff; padding:30px; border-radius:20px; width:90%; max-width:450px; position:relative; }
        .modal-input { width:100%; padding:12px; margin:10px 0; border:1px solid #eee; border-radius:10px; background:#f9f9f9; }
      `}</style>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <FaTimes style={{position:'absolute', top:'20px', right:'20px', cursor:'pointer'}} onClick={() => setShowModal(false)} />
            <h3>{editIndex !== null ? "Edit" : "Add"} {modalType}</h3>
            <form onSubmit={handleSave}>
              {modalType === "Event" && (
                <>
                  <input name="title" className="modal-input" placeholder="Event Name" value={formData.title || ""} onChange={handleInputChange} required />
                  <input name="date" className="modal-input" placeholder="Date (e.g. 15 FEB)" value={formData.date || ""} onChange={handleInputChange} required />
                  <input name="location" className="modal-input" placeholder="Location" value={formData.location || ""} onChange={handleInputChange} required />
                </>
              )}
              {modalType === "Leader" && (
                <>
                  <input name="name" className="modal-input" placeholder="Name" value={formData.name || ""} onChange={handleInputChange} required />
                  <input name="position" className="modal-input" placeholder="Position" value={formData.position || ""} onChange={handleInputChange} required />
                  <input name="year" className="modal-input" placeholder="Year" value={formData.year || ""} onChange={handleInputChange} required />
                </>
              )}
              {modalType === "About" && (
                <textarea name="description" className="modal-input" rows="5" value={formData.description || ""} onChange={handleInputChange} required />
              )}
              {modalType === "Club Details" && (
                <input name="name" className="modal-input" placeholder="Club Name" value={formData.name || ""} onChange={handleInputChange} required />
              )}
              <button type="submit" style={{...styles.primaryBtn, width:'100%', border:'none', marginTop:'15px'}}><FaSave /> Save Changes</button>
            </form>
          </div>
        </div>
      )}

      <div style={styles.modernHero}>
        <div style={styles.glassLogo}>
          {club.logo ? <img src={club.logo} alt={club.name} style={styles.logoImg} /> : <span style={styles.initials}>{club.name.charAt(0)}</span>}
        </div>
        <h1 style={styles.mainTitle}>{club.name} {isAdmin && <FaEdit className="admin-btn" style={{fontSize:'18px'}} onClick={() => openModal("Club Details", {name: club.name})} />}</h1>
        <div style={styles.badgeRow}>
          <span style={styles.heroBadge}>📅 Est. {club.established}</span>
          <span style={styles.heroBadge}>🏷️ {club.category}</span>
        </div>
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.leftCol}>
          <div style={styles.contentCard}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
              <h3 style={{...styles.cardHeader, margin:0}}>About Community</h3>
              {isAdmin && <button className="admin-btn" onClick={() => openModal("About", {description: club.description})}><FaEdit /> Edit</button>}
            </div>
            <p style={styles.descriptionText}>{club.description}</p>
          </div>

          <div style={styles.contentCard}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
              <h3 style={{...styles.cardHeader, margin:0}}><FaCalendarAlt style={{marginRight:'10px'}}/>Events Conducted</h3>
              {isAdmin && <button className="add-btn" onClick={() => openModal("Event")}><FaPlusCircle /> Add Event</button>}
            </div>
            <div style={styles.eventList}>
              {club.events && club.events.length > 0 ? club.events.map((event, idx) => (
                <div key={idx} style={styles.eventItem}>
                  <div style={styles.eventDateBox}>
                    <span style={{fontWeight:'800'}}>{event.date.split(' ')[0]}</span>
                    <span style={{fontSize:'0.65rem'}}>{event.date.split(' ')[1]}</span>
                  </div>
                  <div style={styles.eventInfo}>
                    <h4 style={{margin:0, fontSize:'1rem'}}>{event.title}</h4>
                    <p style={{margin:0, fontSize:'0.8rem', color:'#777'}}><FaMapMarkerAlt /> {event.location}</p>
                  </div>
                  {isAdmin && (
                    <div style={{display:'flex', gap:'5px', marginLeft:'auto'}}>
                      <button className="admin-btn" onClick={() => openModal("Event", event, idx)}><FaEdit /></button>
                      <button className="admin-btn delete-btn" onClick={() => handleDelete('Event', idx)}><FaTrash /></button>
                    </div>
                  )}
                </div>
              )) : <p style={{color:'#999'}}>No events available</p>}
            </div>
          </div>

          {club.leadership && club.leadership.length > 0 && (
            <div style={styles.contentCard}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                <h3 style={{...styles.cardHeader, margin:0}}>Leadership Team</h3>
                {isAdmin && <button className="add-btn" onClick={() => openModal("Leader")}><FaPlusCircle /> Add Member</button>}
              </div>
              {isSliderRequired ? (
                <Swiper modules={[Pagination, Autoplay, Navigation]} spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} style={{ paddingBottom: "40px" }}>
                  {club.leadership.map((member, index) => (
                    <SwiperSlide key={index}>
                      <div style={styles.leaderCard}>
                        <img src={member.photo} alt={member.name} style={styles.leaderPhoto} />
                        <h4 style={styles.leaderName}>{member.name}</h4>
                        <span style={styles.leaderPos}>{member.position}</span>
                        {isAdmin && (
                          <div style={{marginTop:'10px'}}>
                            <button className="admin-btn" onClick={() => openModal("Leader", member, index)}><FaEdit /></button>
                            <button className="admin-btn delete-btn" onClick={() => handleDelete('Leader', index)}><FaTrash /></button>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div style={styles.leaderGrid}>
                  {club.leadership.map((member, index) => (
                    <div key={index} style={styles.leaderCard}>
                      <img src={member.photo} alt={member.name} style={styles.leaderPhoto} />
                      <h4 style={styles.leaderName}>{member.name}</h4>
                      <span style={styles.leaderPos}>{member.position}</span>
                      {isAdmin && (
                        <div style={{marginTop:'10px'}}>
                          <button className="admin-btn" onClick={() => openModal("Leader", member, index)}><FaEdit /></button>
                          <button className="admin-btn delete-btn" onClick={() => handleDelete('Leader', index)}><FaTrash /></button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={styles.contentCard}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
              <h3 style={{...styles.cardHeader, margin:0}}><FaImages style={{marginRight:'10px'}}/> Club Moments</h3>
              {isAdmin && <button className="add-btn" onClick={() => openModal("Gallery")}><FaPlusCircle /> Add Photo</button>}
            </div>
            <div style={styles.galleryGrid}>
              {club.gallery && club.gallery.length > 0 ? club.gallery.map((img, i) => (
                <div key={i} className="gallery-item" style={{position:'relative'}}>
                  <img src={img} alt="Gallery" style={styles.galleryImg} />
                  {isAdmin && <button className="admin-btn delete-btn" style={{position:'absolute', top:'5px', right:'5px', padding:'3px'}} onClick={() => handleDelete('Gallery', i)}><FaTrash size={10}/></button>}
                </div>
              )) : <p style={{color:'#999'}}>No photos available</p>}
            </div>
          </div>
        </div>

        <div style={styles.rightCol}>
          <div style={styles.stickySidebar}>
            <div style={{...styles.infoBox, background: '#003a54', color: '#fff'}}>
              <h4 style={{color: '#fff', marginBottom: '10px'}}><FaUserPlus /> Join Us</h4>
              <p style={{fontSize: '0.85rem', lineHeight: '1.5'}}>Interested in joining? Click below to apply for membership!</p>
              <button style={styles.joinBtn}>Apply Now</button>
            </div>
            
            <div style={styles.infoBox}>
              <h4 style={styles.sidebarTitle}>Quick Info</h4>
              <ul style={styles.infoList}>
                <li><strong>Status:</strong> <span style={{color: '#27ae60'}}>● Active</span></li>
                <li><strong>Campus:</strong> CGEC Main</li>
              </ul>
              <a href={club.newsUrl} target="_blank" rel="noreferrer" style={styles.primaryBtn}>Official Site ↗</a>
            </div>

            <div style={styles.infoBox}>
              <h4 style={styles.sidebarTitle}>Follow Us</h4>
              <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center'}}>
                {club.faceBook && club.faceBook !== "#!" && (
                  <a href={club.faceBook} target="_blank" rel="noreferrer" style={styles.socialIcon}><i className="fab fa-facebook-f"></i></a>
                )}
                {club.insta && club.insta !== "#!" && (
                  <a href={club.insta} target="_blank" rel="noreferrer" style={styles.socialIcon}><i className="fab fa-instagram"></i></a>
                )}
                {club.linkedIn && club.linkedIn !== "#!" && (
                  <a href={club.linkedIn} target="_blank" rel="noreferrer" style={styles.socialIcon}><i className="fab fa-linkedin-in"></i></a>
                )}
                {club.github && club.github !== "#!" && (
                  <a href={club.github} target="_blank" rel="noreferrer" style={styles.socialIcon}><i className="fab fa-github"></i></a>
                )}
                {club.yt && club.yt !== "#!" && (
                  <a href={club.yt} target="_blank" rel="noreferrer" style={styles.socialIcon}><i className="fab fa-youtube"></i></a>
                )}
                {isAdmin && <button className="admin-btn" style={{margin:0}} onClick={() => openModal("Social Link")}><FaPlusCircle /></button>}
              </div>
            </div>

            <button onClick={() => navigate(-1)} style={styles.outlineBtn}>← Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modernHero: { background: "linear-gradient(135deg, #003a54 0%, #0078a8 100%)", borderRadius: "30px", padding: "60px 20px", textAlign: "center", color: "#fff", marginBottom: "40px", marginTop: "80px" },
  glassLogo: { width: "120px", height: "120px", margin: "0 auto 20px", backgroundColor: "rgba(255, 255, 255, 0.15)", borderRadius: "25px", border: "1px solid rgba(255, 255, 255, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  logoImg: { width: "100%", height: "100%", objectFit: "cover" },
  mainTitle: { fontSize: "2.2rem", fontWeight: "800", margin: "0 0 15px", display:'flex', justifyContent:'center', alignItems:'center' },
  badgeRow: { display: "flex", justifyContent: "center", gap: "10px" },
  heroBadge: { backgroundColor: "rgba(255, 255, 255, 0.1)", padding: "6px 15px", borderRadius: "50px", fontSize: "0.85rem" },
  mainGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", padding: "0 20px" },
  leftCol: { display: "flex", flexDirection: "column", gap: "25px" },
  contentCard: { backgroundColor: "#fff", padding: "25px", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" },
  cardHeader: { fontSize: "1.2rem", fontWeight: '700', color: "#003a54", marginBottom: "20px" },
  descriptionText: { fontSize: "1.05rem", lineHeight: "1.7", color: "#555" },
  eventList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  eventItem: { display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', background: '#f8fbff', borderRadius: '15px' },
  eventDateBox: { background: '#0078a8', color: '#fff', padding: '8px', borderRadius: '10px', textAlign: 'center', minWidth: '55px' },
  leaderGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "15px" },
  leaderCard: { textAlign: "center", padding: "20px", backgroundColor: "#f8fbff", borderRadius: "20px", border: "1px solid #eef2f6" },
  leaderPhoto: { width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", marginBottom: "12px", border: "3px solid #0078a8" },
  leaderName: { fontSize: "0.95rem", fontWeight: "700", margin: "0 0 5px" },
  leaderPos: { fontSize: "0.8rem", color: "#0078a8", fontWeight: "700", display: "block" },
  galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  galleryItem: { height: '100px', borderRadius: '12px', overflow: 'hidden' },
  galleryImg: { width: '100%', height: '100%', objectFit: 'cover' },
  rightCol: { position: "relative" },
  stickySidebar: { display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "100px" },
  infoBox: { backgroundColor: "#fff", padding: "25px", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" },
  sidebarTitle: { fontSize: "1.1rem", marginBottom: "15px", fontWeight: '700' },
  socialIcon: { width: '35px', height: '35px', borderRadius: '50%', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0078a8', textDecoration: 'none', transition: '0.3s' },
  primaryBtn: { display: "block", textAlign: "center", backgroundColor: "#0078a8", color: "#fff", padding: "12px", borderRadius: "12px", fontWeight: "700", textDecoration: 'none' },
  joinBtn: { width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: '#fff', color: '#003a54', fontWeight: '700', cursor: 'pointer' },
  outlineBtn: { padding: "12px", borderRadius: "12px", border: "2px solid #ddd", background: 'none', cursor: "pointer", fontWeight: "600", width: '100%' },
};

export default ClubDetailsPage;