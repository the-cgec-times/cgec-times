import React from "react";
import './ClubSection.css'; 
const ClubsSection = () => {
  const clubs = [
    {
      id: 1,
      name: "TECH-O-NICKS",
      newsUrl:'https://techonicks.vercel.app/',
      description: "Empowering students with technology, innovation, and collaboration. Join us to explore coding, robotics, AI, and more!",
    },
    {
      id: 2,
      name: "Debate Club",
      newsUrl:'https://www.instagram.com/cgecdebateclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Engage in thought-provoking discussions and sharpen your argumentation skills. Join us to debate, learn, and lead!"
    },
    {
      id: 3,
      name: "Quilaxy CGEC",
      newsUrl:'https://www.instagram.com/quilaxycgec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Challenge your knowledge and sharpen your mind with exciting quizzes. Join us for fun, learning, and competition!"
    },
    {
      id: 4,
      name: "Pep Talks",
      newsUrl:'https://www.instagram.com/cgec_pep_talks?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Inspire and be inspired! Join us to build confidence, master public speaking, and share powerful ideas."
    },
    {
      id: 5,
      name: "Nritya Nirvana",
      newsUrl:'https://www.instagram.com/nrityanirvana.cgec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Move to the rhythm and express yourself through dance! Join us to learn, perform, and celebrate the art of movement."
    },
    {
      id: 6,
      name: "Capture Crew",
      newsUrl:'https://www.instagram.com/cgec_capture_crew?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Capture moments, tell stories, and explore the art of photography. Join us to learn, create, and share your vision!"
    },
    {
      id: 7,
      name: "Creative Pens",
      newsUrl:'https://www.instagram.com/creativepenscgec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Express your thoughts through poetry and storytelling. Join us to write, share, and inspire with words!"
    },
    {
      id: 8,
      name: "Sports Club",
      newsUrl:'https://www.instagram.com/cgec_sport_club?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Stay active, build teamwork, and embrace the spirit of sports! Join us for training, competitions, and fitness fun."
    },
    {
      id: 9,
      name: "Rongmilanti",
      newsUrl:'https://www.instagram.com/rongmilanti2024?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Unleash your creativity through painting, sketching, and digital art. Join us to explore, create, and inspire!"
    },
    {
      id: 10,
      name: "Pratibima Theatre Group",
      newsUrl:'//',
      description: "Step into the spotlight and bring stories to life! Join us to explore acting, scriptwriting, and stagecraft."
    },
    {
      id: 11,
      name: "Gamer's Creed",
      newsUrl:'https://www.instagram.com/gamers_creed_cgec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Level up your skills and connect with fellow gamers! Join us for casual play, competitive tournaments, and game development."
    },
    {
      id: 12,
      name: "Melodies of CGEC",
      newsUrl:'https://www.instagram.com/melodies_of_cgec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      description: "Stay active, build teamwork, and embrace the spirit of sports! Join us for training, competitions, and fitness fun."
    },
  ];

  return (
    <>
    <div className="clubs-container">
      <h2 className="section-title">OUR CLUBS</h2>
      
      <div className="clubs-grid">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <h3 className="club-name"><a
              rel="noopener noreferrer"
              href={club.newsUrl}
              target="_blank"
              style={{textDecoration:'none'}}
            >
              {club.name}
            </a>
            </h3>
            <p className="club-description">"{club.description}"</p>
          </div>
        ))}
      </div>
    </div>
    <div className="margin"></div>
    </>
  );
};

export default ClubsSection;