import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import NewsletterVerificationSection from "./NewsletterVerificationSection";
import SiteFooter from "./SiteFooter";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./TeamPage.css";

const TeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    year: "",
    dept: "",
    photo: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMembers();
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase.from("team").select("*");
    setMembers(data || []);
    setLoading(false);
  };

  const handleAdd = () => {
    setShowForm(true);
    setEditId(null);
    setFormData({ name: "", position: "", year: "", dept: "", photo: "" });
  };

  const handleEdit = (member) => {
    setShowForm(true);
    setEditId(member.id);
    setFormData(member);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this member?")) {
      await supabase.from("team").delete().eq("id", id);
      fetchMembers();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await supabase.from("team").update(formData).eq("id", editId);
    } else {
      await supabase.from("team").insert([formData]);
    }

    setShowForm(false);
    fetchMembers();
  };

  const handleVerifyCertificate = () => {
    if (!certificateId) return;

    if (certificateId === "CGEC123") {
      setVerificationResult({
        success: true,
        data: { name: "Satyajit Roy", issuedOn: "2026" }
      });
    } else {
      setVerificationResult({ success: false });
    }
  };

  return (
    <div className="team-page">

      <section className="team-hero">
        <h1>Meet Our Team</h1>
        <p>The people behind CGEC Times</p>

        {isAdmin && (
          <button className="add-btn" onClick={handleAdd}>
            + Add Member
          </button>
        )}
      </section>

      <div className="container">

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 }
            }}
          >
            {members.map((member) => (
              <SwiperSlide key={member.id}>
                <div className="team-card">

                  {isAdmin && (
                    <div className="admin-controls">
                      <button onClick={() => handleEdit(member)}>✏️</button>
                      <button onClick={() => handleDelete(member.id)}>🗑</button>
                    </div>
                  )}

                  <div className="team-image">
                    <img
                      src={member.photo}
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x400";
                      }}
                    />
                  </div>

                  <div className="team-info">
                    <h5>{member.name}</h5>
                    <p className="role">{member.position}</p>
                    <p className="dept">{member.year} - {member.dept}</p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>

      {showForm && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={handleSubmit}>
            <h3>{editId ? "Edit Member" : "Add Member"}</h3>

            <input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input placeholder="Position" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
            <input placeholder="Year" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
            <input placeholder="Dept" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})} />
            <input placeholder="Photo URL" value={formData.photo} onChange={e => setFormData({...formData, photo: e.target.value})} />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      <NewsletterVerificationSection
        email={email}
        setEmail={setEmail}
        setCertificateId={setCertificateId}
        handleVerifyCertificate={handleVerifyCertificate}
        verificationResult={verificationResult}
      />

      <SiteFooter />

    </div>
  );
};

export default TeamPage;