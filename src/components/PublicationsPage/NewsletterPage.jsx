import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";

const NewsletterPage = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    cover_image: "",
    pdf_url: "",
    pages: []
  });

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("newsletter_publications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setPublications(data);
    }

    setLoading(false);
  };

  const uploadFile = async (file) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    const { error } = await supabase.storage
      .from("publications")
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("publications")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  };

  const handleFileUpload = async (e, field) => {
    try {
      setUploading(true);

      const file = e.target.files[0];

      if (!file) return;

      const url = await uploadFile(file);

      setFormData((prev) => ({
        ...prev,
        [field]: url
      }));
    } catch (err) {
      alert("Upload failed!");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handlePagesUpload = async (e) => {
    try {
      setUploading(true);

      const files = Array.from(e.target.files);

      if (files.length === 0) return;

      const urls = await Promise.all(
        files.map((file) => uploadFile(file))
      );

      setFormData((prev) => ({
        ...prev,
        pages: [...prev.pages, ...urls]
      }));
    } catch (err) {
      alert("Pages upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (news) => {
    setEditingId(news.id);

    setFormData({
      title: news.title || "",
      date: news.date || "",
      cover_image: news.cover_image || "",
      pdf_url: news.pdf_url || "",
      pages: news.pages || []
    });

    setShowAddForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cover_image || !formData.pdf_url) {
      return alert("Please wait for uploads to finish!");
    }

    if (editingId) {
      const { data, error } = await supabase
        .from("newsletter_publications")
        .update(formData)
        .eq("id", editingId)
        .select();

      if (!error) {
        setPublications(
          publications.map((item) =>
            item.id === editingId ? data[0] : item
          )
        );

        alert("Updated successfully!");
      } else {
        alert(error.message);
      }
    } else {
      const { data, error } = await supabase
        .from("newsletter_publications")
        .insert([formData])
        .select();

      if (!error) {
        setPublications([data[0], ...publications]);

        alert("Published successfully!");
      } else {
        alert(error.message);
      }
    }

    setShowAddForm(false);
    setEditingId(null);

    setFormData({
      title: "",
      date: "",
      cover_image: "",
      pdf_url: "",
      pages: []
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      const { error } = await supabase
        .from("newsletter_publications")
        .delete()
        .eq("id", id);

      if (!error) {
        setPublications(
          publications.filter((pub) => pub.id !== id)
        );

        alert("Deleted successfully!");
      } else {
        alert("Error deleting: " + error.message);
      }
    }
  };

  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
        marginTop: "90px"
      }}
    >
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Newsletter Archive</h2>

          {isAdmin && (
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() => {
                setEditingId(null);

                setFormData({
                  title: "",
                  date: "",
                  cover_image: "",
                  pdf_url: "",
                  pages: []
                });

                setShowAddForm(true);
              }}
            >
              + Add Issue
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-5">
            Loading...
          </div>
        ) : (
          <div className="row g-4">
            {publications.map((news) => (
              <div key={news.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => handleDelete(news.id)}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 z-3 rounded-circle"
                        title="Delete Issue"
                      >
                        <i className="fas fa-trash"></i>
                      </button>

                      <button
                        onClick={() => handleEdit(news)}
                        className="btn btn-primary btn-sm position-absolute top-0 start-0 m-2 z-3 rounded-circle"
                        title="Edit Issue"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </>
                  )}

                  <img
                    src={news.cover_image}
                    className="card-img-top"
                    style={{
                      height: "260px",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      imageRendering: "auto",
                      transform: "scale(1)",
                      backfaceVisibility: "hidden"
                    }}
                    alt="newsletter cover"
                  />

                  <div className="card-body">
                    <h5 className="fw-bold">
                      {news.title}
                    </h5>

                    <p className="text-muted small">
                      {news.date}
                    </p>

                    <div className="d-flex gap-2">
                      <Link
                        to={`/read-paper/${news.id}`}
                        className="btn btn-primary flex-fill btn-sm rounded-pill"
                      >
                        Read Online
                      </Link>

                      <a
                        href={news.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-danger flex-fill btn-sm rounded-pill"
                      >
                        PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000
          }}
        >
          <div
            className="bg-white p-4 rounded-4 shadow-lg"
            style={{
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              zIndex: 2001,
              opacity: 1
            }}
          >
            <h4 className="fw-bold mb-3 text-dark">
              {editingId
                ? "Edit Newsletter"
                : "Add New Newsletter"}
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="small fw-bold text-dark">
                  Issue Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value
                    })
                  }
                />
              </div>

              <div className="mb-3 text-start">
                <label className="small fw-bold text-dark">
                  Date (e.g. May 2026)
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="May 2026"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value
                    })
                  }
                />
              </div>

              <div className="mb-3 p-2 border rounded bg-light text-start">
                <label className="small fw-bold d-block text-dark">
                  Cover Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    handleFileUpload(
                      e,
                      "cover_image"
                    )
                  }
                />

                {formData.cover_image && (
                  <span className="text-success small fw-bold">
                    ✅ Uploaded
                  </span>
                )}
              </div>

              <div className="mb-3 p-2 border rounded bg-light text-start">
                <label className="small fw-bold d-block text-dark">
                  PDF File
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  className="form-control form-control-sm"
                  onChange={(e) =>
                    handleFileUpload(e, "pdf_url")
                  }
                />

                {formData.pdf_url && (
                  <span className="text-success small fw-bold">
                    ✅ Uploaded
                  </span>
                )}
              </div>

              <div className="mb-3 p-2 border rounded bg-light text-start">
                <label className="small fw-bold d-block text-dark">
                  Read Pages (Select Multiple Images)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="form-control form-control-sm"
                  onChange={handlePagesUpload}
                />

                <div className="small text-primary mt-1">
                  {formData.pages.length} images selected
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-grow-1 fw-bold"
                  disabled={uploading}
                >
                  {uploading
                    ? "Processing..."
                    : editingId
                    ? "Update Newsletter"
                    : "Publish Newsletter"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary fw-bold"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);

                    setFormData({
                      title: "",
                      date: "",
                      cover_image: "",
                      pdf_url: "",
                      pages: []
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterPage;