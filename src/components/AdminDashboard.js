import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const DEFAULT_CATEGORIES = [
  "ESPERANZA 2K26",
  "TECHNOLOGY",
  "SPORTS",
  "CULTURAL",
  "CREATIVE PENS"
];

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const editItem = location.state?.editItem || null;

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "ESPERANZA 2K26",
    content: "",
    image: "",
    newsUrl: ""
  });

  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    if (editItem) {
      const isDefault = DEFAULT_CATEGORIES.includes(editItem.category);
      if (isDefault) {
        setFormData(editItem);
      } else {
        setFormData({ ...editItem, category: "OTHERS" });
        setCustomCategory(editItem.category || "");
      }
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCategory = formData.category === "OTHERS" 
      ? customCategory.trim() 
      : formData.category;

    if (!finalCategory) {
      alert("Please enter a category name");
      return;
    }

    const payload = {
      title: formData.title,
      content: formData.content,
      category: finalCategory,
      date: formData.date,
      image: formData.image,
      newsUrl: formData.newsUrl
    };

    if (editItem) {
      //  UPDATE
      const { error } = await supabase
        .from("news")
        .update(payload)
        .eq("id", editItem.id);

      if (error) {
        alert("Update failed");
      } else {
        alert("News Updated!");
        navigate("/news");
      }
    } else {
      //  INSERT
      const { error } = await supabase
        .from("news")
        .insert([payload]);

      if (error) {
        alert("Insert failed");
      } else {
        alert("News Added!");
        navigate("/news");
      }
    }
  };

  return (
    <div className="container mt-5 pt-5 mb-5">
      <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">
            {editItem ? "📝 Edit News Story" : "🚀 Add New Update"}
          </h2>
          <p className="text-muted">Fill in the details below to publish the news</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label className="form-label fw-bold">Headline / Title</label>
              <input 
                type="text" 
                className="form-control border-0 bg-light p-3" 
                placeholder="Enter news title"
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })} 
                required 
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Date / Source</label>
              <input 
                type="text" 
                className="form-control border-0 bg-light p-3" 
                placeholder="e.g. 25th March, 2025"
                value={formData.date} 
                onChange={e => setFormData({ ...formData, date: e.target.value })} 
                required 
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Category</label>
              <select 
                className="form-select border-0 bg-light p-3" 
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {DEFAULT_CATEGORIES.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
                <option value="OTHERS">OTHERS (Custom)</option>
              </select>

              {formData.category === "OTHERS" && (
                <div className="mt-2">
                  <input 
                    type="text" 
                    className="form-control border-0 bg-light p-3" 
                    placeholder="Enter custom category name"
                    value={customCategory} 
                    onChange={e => setCustomCategory(e.target.value)} 
                    required 
                  />
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Image URL</label>
              <input 
                type="text" 
                className="form-control border-0 bg-light p-3" 
                placeholder="https://example.com/"
                value={formData.image} 
                onChange={e => setFormData({ ...formData, image: e.target.value })} 
                required 
              />
              <small className="text-muted">Direct link to the image</small>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">External News Link (Optional)</label>
              <input 
                type="text" 
                className="form-control border-0 bg-light p-3" 
                placeholder="e.g. Instagram or Web Link"
                value={formData.newsUrl || ""} 
                onChange={e => setFormData({ ...formData, newsUrl: e.target.value })} 
              />
            </div>

            <div className="col-12 mb-4">
              <label className="form-label fw-bold">Detailed Content</label>
              <textarea 
                className="form-control border-0 bg-light p-3" 
                rows="6" 
                placeholder="Write the full story here..."
                value={formData.content} 
                onChange={e => setFormData({ ...formData, content: e.target.value })} 
                required 
              ></textarea>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary px-5 py-3 fw-bold rounded-pill shadow">
              {editItem ? "Update News" : "Publish News"}
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary px-5 py-3 fw-bold rounded-pill" 
              onClick={() => navigate("/news")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;