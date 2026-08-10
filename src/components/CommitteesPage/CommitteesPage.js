import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { committeesData } from "../../data/committees";
import "./CommitteesPage.css";

const CommitteesPage = () => {
  const { committeeType } = useParams();
  const data = committeesData[committeeType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [committeeType]);

  if (!data) {
    return (
      <div
        className="container text-center"
        style={{ marginTop: "180px", minHeight: "60vh" }}
      >
        <h2>Committee Not Found</h2>
        <p>The committee you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div
      className="committees-container container"
      style={{ marginTop: "160px", marginBottom: "60px" }}
    >
      <div
        className="committee-header p-5 rounded shadow-sm text-white mb-5"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        }}
      >
        <div className="d-flex align-items-center gap-4">
          <div
            className="committee-icon bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "80px", fontSize: "40px" }}
          >
            <i className={data.icon}></i>
          </div>
          <div>
            <h1 className="fw-bold">{data.name}</h1>
            <p className="lead opacity-75">{data.description}</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h3 className="text-primary mb-3">
              <i className="fas fa-bullseye me-2"></i>Objective
            </h3>
            <p className="text-muted">{data.objective}</p>
          </div>

          <div className="card border-0 shadow-sm p-4">
            <h3 className="text-danger mb-3">
              <i className="fas fa-scroll me-2"></i>Key Guidelines
            </h3>
            <ul className="list-group list-group-flush">
              {data.guidelines?.map((item, index) => (
                <li key={index} className="list-group-item border-0 ps-0">
                  <i className="fas fa-arrow-right text-primary me-2 small"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h3 className="text-success mb-4">
              <i className="fas fa-users me-2"></i>Committee Members
            </h3>

            {committeeType === "anti-ragging" ? (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle text-center">
                  <thead className="table-primary">
                    <tr>
                      <th>Sl.</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.members.map((m) => (
                      <tr key={m.sl}>
                        <td>{m.sl}</td>
                        <td className="fw-bold text-start">{m.name}</td>
                        <td>{m.department}</td>
                        <td>{m.designation}</td>
                        <td>
                          <a
                            href={`mailto:${m.email}`}
                            className="text-decoration-none"
                          >
                            {m.email}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
             
              <div className="member-list">
                {data.members.map((member, index) => (
                  <div
                    key={index}
                    className="member-card d-flex align-items-center p-3 mb-3 bg-light rounded shadow-sm border-start border-4 border-primary"
                  >
                    <div>
                      <h6 className="mb-0 fw-bold">{member.name}</h6>
                      <small className="text-primary d-block">
                        {member.role}
                      </small>
                      <small className="text-muted">
                        {member.department}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteesPage;
