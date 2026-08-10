import React from "react";
import { annualReportData } from "../../data/publications";

const AnnualReportPage = () => {
  const data = annualReportData;

  if (!data.publications || data.publications.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: "120px" }}>
        <h4>No annual reports available</h4>
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
        <div className="row g-4">
          {data.publications.map((report) => (
            <div key={report.id} className="col-lg-6">
              <div className="card p-4 shadow-sm rounded-4 h-100">
                <h4 className="fw-bold">{report.title}</h4>
                <span className="badge bg-primary mb-3">{report.date}</span>

                <div className="mb-3">
                  {report.sections?.map((s, i) => (
                    <span key={i} className="badge bg-light border me-2">
                      {typeof s === "string" ? s : s.name}
                    </span>
                  ))}
                </div>

                <a
                  href={report.downloadUrl}
                  className="btn btn-dark rounded-pill w-100"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Report
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnualReportPage;
