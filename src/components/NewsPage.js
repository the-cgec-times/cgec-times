import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./NewsPage.css";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allNews, setAllNews] = useState([]);
  const [links, setLinks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfTitle, setPdfTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
    fetchNotices();
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, []);
  console.log(links);
  const fetchNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("id", { ascending: false });

    setAllNews(data || []);
  };

  const fetchNotices = async () => {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("id", { ascending: false });

    setLinks(data || []);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this news?")) {
      await supabase.from("news").delete().eq("id", id);
      fetchNews();
    }
  };

  const deleteNotice = async (notice) => {
    if (!window.confirm("Delete this notice?")) return;

    const filePath = notice.file.split("/").pop();

    await supabase.storage.from("notices").remove([filePath]);

    await supabase.from("notices").delete().eq("id", notice.id);

    fetchNotices();
  };

  const uploadPDF = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("notices")
      .upload(fileName, file, {
        contentType: "application/pdf",
      });

    if (error) {
      console.error("UPLOAD ERROR:", error);
      alert("Upload failed: " + error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("notices")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  const handlePDFUpload = async () => {
    if (!pdfFile) return alert("Select PDF first");

    const url = await uploadPDF(pdfFile);

    if (!url) return;

    const { error } = await supabase.from("notices").insert([
      {
        title: pdfTitle || "Latest Notice",
        file: url,
      },
    ]);

    if (error) {
      alert("DB insert failed");
    } else {
      alert("PDF Uploaded!");
      fetchNotices();
    }
  };

  const filteredNews = allNews.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="news-page-wrapper navbar-spacer">
      <div className="container mt-4">
        <div className="notice-board-premium d-flex align-items-stretch rounded-4 overflow-hidden shadow-lg bg-white border">
          <div className="notice-label bg-danger text-white px-4 py-3 fw-bold">
            <i className="fas fa-bolt me-2"></i> HOT UPDATES
          </div>

          <div className="ticker-container flex-grow-1 d-flex align-items-center">
            <div className="ticker-wrapper">
              {links.map((link) => (
                <div key={link.id} className="ticker-item px-4 border-end">
                  <span className="fw-bold">{link.title}</span>

                  <a
                    href={link.file}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="ms-2 text-danger"
                  >
                    Download
                  </a>

                  {isAdmin && (
                    <button
                      onClick={() => deleteNotice(link)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="container mt-3">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold">Add Notice PDF</h5>

            <input
              type="text"
              placeholder="Notice Title"
              className="form-control mb-2"
              onChange={(e) => setPdfTitle(e.target.value)}
            />

            <input
              type="file"
              accept="application/pdf"
              className="form-control mb-2"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />

            <button className="btn btn-success" onClick={handlePDFUpload}>
              Upload PDF
            </button>
          </div>
        </div>
      )}

      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold">THE LATEST NEWS</h1>
        </header>

        <div className="row justify-content-center mb-5">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search news..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="row g-4">
          {filteredNews.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm rounded-4">
                {isAdmin && (
                  <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
                    <button
                      onClick={() =>
                        navigate("/admin-dashboard", {
                          state: { editItem: item },
                        })
                      }
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <img
                  src={item.image}
                  alt="news"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <span className="badge bg-danger">{item.category}</span>
                  <h5 className="mt-2">{item.title}</h5>
                  <p>{item.content.slice(0, 80)}...</p>

                  <Link
                    to={`/news-details/${item.id}`}
                    className="text-danger fw-bold"
                  >
                    READ MORE →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
