import React from "react";
import { researchPapersData } from "../../data/publications";

const ResearchPapersPage = () => {
  const data = researchPapersData;

  if (!data.categories || data.categories.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: "120px" }}>
        <h4>No research papers available</h4>
      </div>
    );
  }

  return (
    <div style={{ background: "#f4f7f6", minHeight: "100vh", marginTop: "90px" }}>
      <section className="bg-white border-bottom py-5">
        <div className="container d-flex gap-4">
          <div className="bg-primary bg-opacity-10 p-4 rounded-circle">
            <i className={`${data.icon} fa-3x text-primary`} />
          </div>
          <div>
            <h1 className="fw-bold">{data.name}</h1>
            <p className="text-muted">{data.description}</p>
          </div>
        </div>
      </section>

      <div className="container py-5">
        {data.categories.map((cat) => (
          <div key={cat.name} className="mb-5">
            <h4 className="fw-bold mb-4">{cat.name}</h4>

            {cat.papers.map((paper) => (
              <div
                key={paper.id}
                className="card p-4 shadow-sm rounded-4 mb-3 border-start border-primary border-4"
              >
                <h5 className="fw-bold">{paper.title}</h5>
                <p className="small text-muted">
                  <strong>Authors:</strong> {paper.authors.join(", ")}
                </p>
                <p className="text-primary small fw-bold">
                  {paper.journal || paper.conference} • {paper.date}
                </p>
                <p className="fst-italic text-muted">"{paper.abstract}"</p>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="small text-muted">
                    DOI: {paper.doi} | Citations: {paper.citations}
                  </span>
                  <a
                    href={paper.downloadUrl}
                    className="btn btn-sm btn-primary rounded-pill"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPapersPage;
