import React from "react";
import "./EventSection.css";

const EventsSection = () => {
  const events = {
    description:
      "At Cooch Behar Government Engineering College(CGEC), we belive in fostering a vibrant and dynamic  campus life. From technical fests to cultural extravaganzas, hackathons to Rashmela celebrations, our events bring together students, faculty, and innovators to showcase talent, share knowledge, and create unforgettable experience",
    previous: [
      {
        id: 1,
        name: "CROESO-2024",
        newsUrl:
          "https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html",
        description:
          "CROESO 2K24 is the much-awaited Freshers' Party at Cooch Behar Government Engineering  College (CGEC), designed to give the newest batch a grand welcome!",
      },
      {
        id: 2,
        name: "TECHNOVISTA",
        newsUrl:
          "https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html",
        description:
          "TECHNOVISTA 2025 is an exciting 3-day online competition, running from  January 29 to January 31, 2025, designed to  challenge and inspire tech enthusiasts.",
      },
      {
        id: 5,
        name: "EUREKA 2K25",
        newsUrl:
          "https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html",
        description:
          " EUREKA!, the ultimate Entrepreneurship Competition designed to empower student innovators and future business leaders.",
      },
    ],
    upcoming: [
      {
        id: 3,
        name: "ANNUAL SPORTS 2025",
        newsUrl:
          "https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html",
        description:
          "Cooch Behar Government Engineering College  presents its Annual  Sports Event, a thrilling showcase of athletic talent,  teamwork, and competitive spirit.  Join us for an action-packed celebration of sportsmanship and excellence!",
      },
      {
        id: 4,
        name: "ESPERANZA",
        newsUrl:
          "https://satya-dr.github.io/CGEC-TIMES/mainWeb/comingSoon/index.html",
        description:
          "Join us at Cooch Behar Government Engineering College for a spectacular fashion show, showcasing trendy designs and creative styles on the runway. Don’t miss this night of glamour, talent, and entertainment!",
      },
    ],
  };

  return (
    <>
      <div className="events-container">
        <h1 className="section-title">EVENTS</h1>

        <p className="events-description">{events.description}</p>

        <div className="events-divider"></div>

        <div className="events-categories">
          <div className="events-column">
            <h2 className="category-title">Previous</h2>
            {events.previous.map((event) => (
              <div className="event-card">
                <h3 className="event-name">
                  <a
                    rel="noopener noreferrer"
                    href={event.newsUrl}
                    target="_blank"
                    className="btn eventBtn my-2"
                  >
                    {event.name}
                  </a>
                </h3>
                <p className="event-description">
                  {event.description.slice(0, 150)}
                  {event.description.length > 150 && "..."}
                </p>
              </div>
            ))}
          </div>

          <div className="events-column">
            <h2 className="category-title">Upcoming</h2>
            {events.upcoming.map((event) => (
              <div className="event-card">
                <h3 className="event-name">
                  <a
                    rel="noopener noreferrer"
                    href={event.newsUrl}
                    target="_blank"
                    className="btn eventBtn my-2"
                  >
                    {event.name}
                  </a>
                </h3>
                <p className="event-description">
                  {event.description.slice(0, 150)}
                  {event.description.length > 150 && "..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="margin"></div>
    </>
  );
};

export default EventsSection;
