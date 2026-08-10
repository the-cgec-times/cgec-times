import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { sportsData } from "../../data/sports";

const SportsPage = () => {
  const { sportName } = useParams();
  const sport = sportsData[sportName?.toLowerCase()];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sportName]);

  if (!sport) {
    return (
      <div className="container text-center py-5" style={{ marginTop: "150px" }}>
        <h2 className="fw-bold text-muted">Sport Not Found</h2>
        <Link to="/" className="btn btn-dark rounded-0 mt-3">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="sports-container bg-white" style={{ minHeight: "100vh", paddingTop: "120px" }}>
      
      {/* --- আধুনিক টাইটেল সেকশন --- */}
      <div className="container mb-5">
        <div className="row align-items-center">
          <div className="col-lg-auto text-center mb-4 mb-lg-0">
            {/* লোগো সেকশন */}
            <div className="bg-white p-2 rounded-4 shadow-sm border" style={{ width: "140px", height: "140px" }}>
              <img 
                src={sport.logo} 
                className="w-100 h-100 object-fit-contain" 
                alt={`${sport.name} logo`} 
              />
            </div>
          </div>
          <div className="col-lg ps-lg-4 text-center text-lg-start">
            <nav aria-label="breadcrumb" className="mb-2">
              <ol className="breadcrumb justify-content-center justify-content-lg-start small text-uppercase fw-bold">
                <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                <li className="breadcrumb-item active text-primary" aria-current="page">Sports</li>
              </ol>
            </nav>
            <h1 className="display-3 fw-black text-dark mb-1" style={{ letterSpacing: "-2px", fontWeight: "900" }}>
              {sport.name.toUpperCase()}
            </h1>
            <p className="text-muted fs-5 mb-0">
              <i className="fas fa-university me-2 text-primary"></i>
              Official Athletic Wing of CGEC
            </p>
          </div>
        </div>
        <hr className="mt-5 opacity-10" />
      </div>

      <div className="container mt-4">
        <div className="row g-5">
          
          {/* --- বাঁদিকের কলাম: ব্রিফ এবং নিউজ --- */}
          <div className="col-lg-8">
            <section className="mb-5">
              <h2 className="h4 fw-bold mb-4 text-uppercase" style={{ letterSpacing: "1px" }}>The Brief</h2>
              <p className="fs-5 text-secondary lh-lg" style={{ textAlign: "justify" }}>
                {sport.description}
              </p>
            </section>

            <section className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold m-0 text-uppercase" style={{ letterSpacing: "1px" }}>Headlines</h2>
                <div className="flex-grow-1 ms-4 border-bottom"></div>
              </div>
              
              <div className="row g-4">
                {sport.news?.map((news) => (
                  <div key={news.id} className="col-12">
                    <div className="card border-0 border-bottom rounded-0 pb-4 mb-2 bg-transparent transition-all hover-lift">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-4 mb-3 mb-md-0">
                          <img 
                            src={news.image} 
                            className="rounded-4 w-100" 
                            style={{ height: "180px", objectFit: "cover" }} 
                            alt={news.title} 
                          />
                        </div>
                        <div className="col-md-8 ps-md-4">
                          <div className="card-body p-0">
                            <span className="text-primary fw-bold small text-uppercase">{news.date}</span>
                            <h4 className="fw-bold my-2 text-dark">{news.title}</h4>
                            <p className="text-muted mb-0 small lh-base">{news.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* --- ডানদিকের কলাম: অর্গানাইজেশন এবং শিডিউল --- */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "100px" }}>
              
              {/* ক্লাব কার্ড - মিনিমালিস্ট ডার্ক ডিজাইন */}
              <div className="p-4 rounded-4 mb-4 bg-dark text-white shadow-lg">
                <h6 className="text-uppercase small mb-3" style={{ color: "#00d4ff", letterSpacing: "2px" }}>The Club</h6>
                <h3 className="fw-bold mb-3">{sport.club.name}</h3>
                <p className="small opacity-75 lh-base mb-4">{sport.club.description}</p>
                <div className="d-grid gap-2">
                  <a href={`mailto:${sport.club.contact}`} className="btn btn-light rounded-pill fw-bold btn-sm py-2">
                    <i className="fas fa-envelope me-2"></i>Contact Secretary
                  </a>
                  <a href={sport.club.instagram} className="btn btn-outline-light rounded-pill fw-bold btn-sm py-2">
                    <i className="fab fa-instagram me-2"></i>Instagram
                  </a>
                </div>
              </div>

              {/* শিডিউল কার্ড */}
              <div className="card border-0 bg-light rounded-4">
                <div className="card-body p-4">
                  <h6 className="text-uppercase small fw-bold mb-4 text-muted" style={{ letterSpacing: "1px" }}>Upcoming Events</h6>
                  {sport.upcomingEvents?.map((event) => (
                    <div key={event.id} className="pb-3 mb-3 border-bottom last-child-border-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold mb-1">{event.name}</h6>
                          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                            <i className="far fa-calendar-alt me-1 text-primary"></i> {event.date}
                          </p>
                          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
                            <i className="fas fa-map-pin me-1 text-danger"></i> {event.venue}
                          </p>
                        </div>
                        <span className="badge bg-white text-dark border small rounded-pill">Fixture</span>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-dark w-100 rounded-pill mt-2 fw-bold small py-2">Full Schedule</button>
                </div>
              </div>

              {/* ট্রায়াল উইজেট */}
              <div className="mt-4 p-4 rounded-4 bg-primary bg-opacity-10 border border-primary border-opacity-25">
                <div className="d-flex align-items-center">
                  <i className="fas fa-medal text-primary fs-4 me-3"></i>
                  <div>
                    <h6 className="fw-bold mb-0">Join the Team</h6>
                    <p className="small text-muted mb-0">Selection trials open soon.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="py-5"></div>
    </div>
  );
};

export default SportsPage;