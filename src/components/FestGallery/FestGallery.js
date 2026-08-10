import React, { useEffect, useState } from "react";
import { galleryCategories as importedCategories } from "../../data/gallery";
import { supabase } from "../../supabase";
import "./FestGallery.css";

const FestGallery = () => {
  // ১. যদি ইমপোর্ট করা ডাটা না পাওয়া যায়, তবে এই ডিফল্ট ক্যাটাগরিগুলো কাজ করবে
  const defaultCategories = [
    { id: 1, name: "All", value: "all" },
    { id: 2, name: "Cultural", value: "Cultural" },
    { id: 3, name: "Technical", value: "Technical" },
    { id: 4, name: "Sports", value: "Sports" }
  ];

  const categories = importedCategories || defaultCategories;

  const [fests, setFests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [activePhotos, setActivePhotos] = useState([]);
  const [activeTitle, setActiveTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "Cultural",
    date: "",
    photos: []
  });

  useEffect(() => {
    fetchFests();
  }, []);

  const fetchFests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("fest_gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
        setFests([]);
      } else {
        setFests(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setFests([]);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("gallery-images")
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

 const handleMainImageUpload = async (e) => {
  try {
    setUploading(true);
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadFile(file);
    setFormData({ ...formData, image: url });
    alert("Upload Successful!");
  } catch (err) {
    console.error("Detailed Error:", err);
    alert("Upload failed! Reason: " + (err.message || "Unknown error"));
  } finally {
    setUploading(false);
  }
};

  const handleAlbumPhotosUpload = async (e) => {
    try {
      setUploading(true);
      const files = Array.from(e.target.files);
      const urls = await Promise.all(files.map(file => uploadFile(file)));
      setFormData({ ...formData, photos: [...(formData.photos || []), ...urls] });
    } catch (err) {
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (fest) => {
    setEditingId(fest.id);
    setFormData({
      name: fest.name || "",
      description: fest.description || "",
      image: fest.image || "",
      category: fest.category || "Cultural",
      date: fest.date || "",
      photos: fest.photos || []
    });
    setShowAddForm(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return alert("Upload cover image first!");

    if (editingId) {
      const { data, error } = await supabase
        .from("fest_gallery")
        .update(formData)
        .eq("id", editingId)
        .select();

      if (!error && data) {
        setFests(fests.map(f => f.id === editingId ? data[0] : f));
        setEditingId(null);
      }
    } else {
      const { data, error } = await supabase
        .from("fest_gallery")
        .insert([formData])
        .select();

      if (!error && data) setFests([data[0], ...fests]);
    }

    setShowAddForm(false);
    setFormData({ name: "", description: "", image: "", category: "Cultural", date: "", photos: [] });
  };

  const deleteFest = async (id) => {
    if (window.confirm("Delete this album?")) {
      const { error } = await supabase.from("fest_gallery").delete().eq("id", id);
      if (!error) setFests(fests.filter(f => f.id !== id));
    }
  };

  const filteredFests = (fests || []).filter(fest => {
    if (selectedCategory === "all") return true;
    return fest.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="fest-gallery-wrapper navbar-spacer">
      <div className="container pt-5">
        <div className="text-center mb-5">
          <h1 className="display-2 fw-black text-white main-title text-uppercase">RELIVE THE MOMENTS</h1>
          
          {isAdmin && (
            <button className="btn btn-success rounded-pill px-4 mb-4" onClick={() => { setEditingId(null); setShowAddForm(true); }}>
              Create New Album
            </button>
          )}

          <div className="d-flex justify-content-center flex-wrap gap-3">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`filter-pill ${selectedCategory === cat.value ? 'active' : ''}`} 
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white"><h3>Loading...</h3></div>
        ) : (
          <div className="row g-4">
            {filteredFests.map((fest) => (
              <div key={fest.id} className="col-md-6 col-lg-4 position-relative">
                {isAdmin && (
                  <div className="position-absolute top-0 end-0 m-3 z-3 d-flex gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(fest)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteFest(fest.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )}
                <div className="modern-gallery-card shadow-lg">
                  <div className="image-container rounded-4 overflow-hidden h-100">
                    <img src={fest.image} className="card-img-modern" alt={fest.name} />
                    <div className="card-overlay p-4">
                      <span className="category-tag-modern">{fest.category}</span>
                      <h3 className="h4 fw-bold text-white mb-1">{fest.name}</h3>
                      <div className="d-flex justify-content-between align-items-center border-top pt-3">
                        <span className="text-white small">{fest.photos?.length || 0} Photos</span>
                        <button className="btn-view-modern" onClick={() => { 
                          setActivePhotos(fest.photos || []); 
                          setActiveTitle(fest.name); 
                          setShowModal(true); 
                        }}>View Album</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddForm && (
          <div className="custom-modal-overlay">
            <div className="modal-content-wrapper bg-white p-4 rounded-4 shadow-lg" style={{ maxWidth: '500px', width: '90%' }}>
              <h3 className="mb-3">{editingId ? "Edit Album" : "Add New Album"}</h3>
              <form onSubmit={handleAddSubmit}>
                <input type="text" placeholder="Fest Name" className="form-control mb-2" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <textarea placeholder="Description" className="form-control mb-2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                
                <label className="small fw-bold">Cover Image:</label>
                <input type="file" className="form-control mb-2" accept="image/*" onChange={handleMainImageUpload} />
                
                <label className="small fw-bold">Album Photos:</label>
                <input type="file" className="form-control mb-2" accept="image/*" multiple onChange={handleAlbumPhotosUpload} />
                
                <input type="text" placeholder="Date" className="form-control mb-2" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                
                <select className="form-select mb-3" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  {categories.filter(c => c.value !== "all").map(c => (
                    <option key={c.id} value={c.value}>{c.name}</option>
                  ))}
                </select>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary flex-grow-1" disabled={uploading}>
                    {uploading ? "Uploading..." : (editingId ? "Update Album" : "Create Album")}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowAddForm(false); setEditingId(null); }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showModal && (
          <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content-wrapper bg-white rounded-4 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-3 border-bottom d-flex justify-content-between">
                <h5 className="mb-0 fw-bold">{activeTitle}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="photo-grid-scroll p-3 bg-light" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row g-3">
                  {activePhotos && activePhotos.length > 0 ? (
                    activePhotos.map((img, idx) => (
                      <div key={idx} className="col-6 col-md-4">
                        <img src={img} className="w-100 rounded shadow-sm" style={{ height: '150px', objectFit: 'cover' }} alt="" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-5">No photos in this album.</div>
                  )}
                </div>
              </div>
              <div className="p-3 text-center border-top">
                <button className="btn btn-danger px-5" onClick={() => setShowModal(false)}>CLOSE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FestGallery;