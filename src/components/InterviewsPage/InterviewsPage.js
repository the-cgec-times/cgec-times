import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { interviewsData } from "../../data/interviews";

const InterviewsPage = () => {
  const { interviewType } = useParams();
  const navigate = useNavigate();
  const interviewData = interviewsData[interviewType];

  if (!interviewData) {
    return (
      <div className="container text-center py-5" style={{ marginTop: "150px" }}>
        <div className="p-5 bg-white rounded-4 shadow-sm">
          <h2 className="fw-bold">Interview type not found!</h2>
          <p className="text-muted mb-4">The requested interview page does not exist.</p>
          <button className="btn btn-primary px-4 rounded-pill" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="interviews-wrapper" style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <section className="position-relative text-white py-5 overflow-hidden" 
               style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", marginTop: "80px" }}>
        <div className="container position-relative z-1 py-4">
          <div className="row align-items-center">
            <div className="col-lg-1 text-center text-lg-start mb-3 mb-lg-0">
              <i className={`${interviewData.icon} display-1 opacity-75`}></i>
            </div>
            <div className="col-lg-7 text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-2">{interviewData.type} Interviews</h1>
              <p className="lead opacity-75 mb-0">{interviewData.description}</p>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="d-flex justify-content-center justify-content-lg-end gap-4">
                <div className="text-center">
                  <div className="h2 fw-bold mb-0">{interviewData.statistics.totalInterviews}</div>
                  <small className="text-uppercase opacity-75">Total Drives</small>
                </div>
                <div className="vr opacity-50"></div>
                <div className="text-center">
                  <div className="h2 fw-bold mb-0">{interviewData.statistics.successRate}</div>
                  <small className="text-uppercase opacity-75">Success Rate</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
              <h2 className="h4 fw-bold mb-0 d-flex align-items-center">
                <i className="fas fa-calendar-check text-primary me-2"></i> Interview Details
              </h2>
              <div className="btn-group shadow-sm rounded-pill p-1 bg-white">
                <button className="btn btn-primary btn-sm rounded-pill px-3 active">All</button>
                <button className="btn btn-light btn-sm rounded-pill px-3">Upcoming</button>
                <button className="btn btn-light btn-sm rounded-pill px-3">Completed</button>
              </div>
            </div>

            <div className="d-flex flex-column gap-4">
              {interviewData.interviews.map((interview) => (
                <div key={interview.id} className="card border-0 shadow-sm rounded-4 overflow-hidden card-hover">
                  <div className="card-header bg-white p-4 border-0 d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 rounded-3 p-1" style={{ width: "50px", height: "50px" }}>
                        <img 
                          src={interview.image} 
                          className="w-100 h-100 object-fit-contain rounded"
                          alt={interview.company}
                          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${interview.company}&background=667eea&color=fff`; }}
                        />
                      </div>
                      <div>
                        <h3 className="h5 fw-bold mb-0">{interview.company}</h3>
                        <span className="text-muted small">{interview.position}</span>
                      </div>
                    </div>
                    <span className={`badge rounded-pill px-3 py-2 ${interview.status.toLowerCase() === 'completed' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning-emphasis'}`}>
                      {interview.status}
                    </span>
                  </div>

                  <div className="card-body px-4 pt-0">
                    <h4 className="h6 fw-bold text-primary mb-2">{interview.title}</h4>
                    <p className="text-muted small mb-4">{interview.content}</p>
                    
                    <div className="row g-3 mb-4">
                      <div className="col-auto">
                        <div className="small text-muted">
                          <i className="fas fa-calendar me-2 text-primary"></i>{interview.date}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="small text-muted">
                          <i className={`fas ${interviewType === 'online' ? 'fa-video' : 'fa-map-marker-alt'} me-2 text-primary`}></i>
                          {interviewType === 'online' ? interview.platform : interview.venue}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="small fw-bold text-dark d-block mb-2">Participants:</label>
                      <div className="d-flex flex-wrap gap-2">
                        {Array.isArray(interview.participants) ? interview.participants.map((p, idx) => (
                          <span key={idx} className="badge bg-light text-dark border fw-normal px-3 py-2 rounded-pill">{p}</span>
                        )) : (
                          <span className="badge bg-light text-dark border fw-normal px-3 py-2 rounded-pill">{interview.participants}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-footer bg-light bg-opacity-50 p-4 border-0 d-flex justify-content-between align-items-center">
                    <div className="small">
                      <strong className="text-dark">Outcome:</strong>
                      <span className="ms-2 fw-bold text-success">{interview.outcome}</span>
                    </div>
                    <button className="btn btn-primary btn-sm rounded-pill px-4">Details <i className="fas fa-arrow-right ms-1"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "100px", zIndex: "1" }}>
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-header bg-white py-3 border-bottom border-light">
                  <h5 className="mb-0 fw-bold"><i className="fas fa-chart-pie text-primary me-2"></i>Overview</h5>
                </div>
                <div className="card-body p-4">
                  {[
                    { label: "Total Drives", val: interviewData.statistics.totalInterviews, p: 100, color: "bg-primary" },
                    { label: "Success Rate", val: interviewData.statistics.successRate, p: parseInt(interviewData.statistics.successRate), color: "bg-success" },
                    { label: "Upcoming", val: interviewData.statistics.upcoming, p: 60, color: "bg-warning" }
                  ].map((stat, i) => (
                    <div className="mb-4" key={i}>
                      <div className="d-flex justify-content-between mb-1 small">
                        <span className="text-muted">{stat.label}</span>
                        <span className="fw-bold">{stat.val}</span>
                      </div>
                      <div className="progress" style={{ height: "6px" }}>
                        <div className="progress-bar rounded-pill" style={{ width: `${stat.p}%`, backgroundColor: stat.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-header bg-white py-3 border-bottom border-light">
                  <h5 className="mb-0 fw-bold"><i className="fas fa-building text-primary me-2"></i>Companies</h5>
                </div>
                <div className="card-body p-3">
                  <div className="row g-2">
                    {interviewData.statistics.companies.map((company, index) => (
                      <div key={index} className="col-6">
                        <div className="p-2 bg-light rounded-3 text-center border">
                          <div className="small fw-bold text-truncate text-muted">{company}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 bg-dark text-white p-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center">
                  <i className="fas fa-lightbulb text-warning me-2"></i> Interview Tips
                </h5>
                <div className="d-flex flex-column gap-3">
                  {[
                    { icon: "fa-file-alt", title: "Resume", desc: "Tailor your resume" },
                    { icon: "fa-code", title: "Technical", desc: "Practice coding problems" },
                    { icon: "fa-comments", title: "Communication", desc: "Explain your thoughts" }
                  ].map((tip, i) => (
                    <div className="d-flex gap-3 align-items-center" key={i}>
                      <div className="bg-white bg-opacity-10 p-2 rounded-3 text-warning">
                        <i className={`fas ${tip.icon}`}></i>
                      </div>
                      <div>
                        <div className="small fw-bold">{tip.title}</div>
                        <div className="small opacity-75">{tip.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsPage;