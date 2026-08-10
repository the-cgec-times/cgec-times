import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabase";

const ReadNewsletterPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("newsletter_publications")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setIssue(data);
      }
      setLoading(false);
    };
    if (id) fetchIssue();
  }, [id]);

  if (loading) return <div className="text-center py-5 mt-5"><h4>Loading Newsletter...</h4></div>;
  if (!issue) return (
    <div className="text-center py-5 mt-5">
      <h4>Newspaper Not Found!</h4>
      <Link to="/publications/newsletter" className="btn btn-primary mt-3">Back to Library</Link>
    </div>
  );

  return (
    <div style={{ background: "#111", minHeight: "100vh", marginTop: "80px" }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 bg-dark p-3 rounded shadow text-white">
  
          <Link to="/publications/newsletter" className="btn btn-outline-light btn-sm">
            <i className="fas fa-arrow-left me-1"></i> Back
          </Link>
          <h5 className="mb-0 fw-bold">{issue.title}</h5>
          <a href={issue.pdf_url} target="_blank" rel="noreferrer" className="btn btn-danger btn-sm">PDF</a>
        </div>

        <div className="d-flex flex-column align-items-center gap-3 pb-5">
          {issue.pages && issue.pages.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              className="img-fluid rounded shadow" 
              style={{ maxWidth: "900px" }} 
              alt={`Page ${index + 1}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadNewsletterPage;