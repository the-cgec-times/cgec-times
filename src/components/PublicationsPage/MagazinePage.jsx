import React from "react";
import { magazineData } from "../../data/publications";

const MagazinePage = () => {

  if (!magazineData || !magazineData.publications) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: "120px" }}>
        <h4>No magazines available</h4>
      </div>
    );
  }

  const current = magazineData.publications[0];

  return (
    <div style={{ background: "#f4f7f6", minHeight: "100vh", marginTop: "90px" }}>
      <section className="bg-white border-bottom py-5">
        <div className="container d-flex gap-4 align-items-center">
          <div className="bg-primary bg-opacity-10 p-4 rounded-circle">
            <i className={`${magazineData.icon} fa-3x text-primary`} />
          </div>
          <div>
            <h1 className="fw-bold">{magazineData.name}</h1>
            <p className="text-muted">{magazineData.description}</p>
          </div>
        </div>
      </section>

      {magazineData.publications.length > 0 && (
        <div className="container py-5">
          <div className="card shadow-sm rounded-4 mb-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={current.coverImage} className="img-fluid h-100" alt="" />
              </div>
              <div className="col-md-8 p-4">
                <span className="badge bg-warning text-dark">Current Issue</span>
                <h2 className="fw-bold mt-2">{current.title}</h2>
                <p className="text-muted">
                  {current.date} • {current.editor}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagazinePage;
