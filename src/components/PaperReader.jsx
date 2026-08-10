import React from "react";
import { useParams } from "react-router-dom";
import { newsletterData } from "../data/publications";

const PaperReader = () => {
  const { monthId } = useParams();

  const issue = newsletterData.publications.find(
    (item) => item.id === Number(monthId)
  );

  if (!issue) {
    return (
      <div className="container text-center py-5" style={{ marginTop: "120px" }}>
        <h4>Newspaper not found</h4>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#f4f7f6",
        minHeight: "100vh",
        marginTop: "80px",
      }}
    >
      <div className="text-center py-4">
        <h2 className="fw-bold">{issue.title}</h2>
        <p className="text-muted">{issue.date}</p>
      </div>

      <div className="container-fluid px-0 pb-5">
        {issue.pages.map((img, index) => (
          <div
            key={index}
            className="mb-4 d-flex justify-content-center"
          >
            <img
              src={img}
              alt={`Page ${index + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                maxWidth: "1200px",  
                height: "auto",
                display: "block",
              }}
              className="shadow rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperReader;
