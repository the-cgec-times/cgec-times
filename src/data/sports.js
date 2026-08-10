

export const sportsData = {
  cricket: {
    id: 1,
    name: "Cricket",
    icon: "fas fa-baseball-bat-ball",
    description: "The gentleman's game - Join us for thrilling cricket matches and tournaments",
    news: [
      // {
      //   id: 1,
      //   title: "CGEC Cricket Team Wins Inter-College Tournament",
      //   date: "March 15, 2025",
      //   content: "Our college cricket team emerged victorious in the annual inter-college cricket tournament held at JGEC grounds. The team showed exceptional skills and sportsmanship throughout the tournament.",
      //   image: "/images/sports/cricket/news1.jpg"
      // },
      // {
      //   id: 2,
      //   title: "Cricket Trials for New Season",
      //   date: "March 10, 2025",
      //   content: "Trials for the college cricket team will be held next week. All interested students are welcome to showcase their talent.",
      //   image: "/images/sports/cricket/news2.jpg"
      // }
    ],
    events: [
      // {
      //   id: 1,
      //   name: "Annual Cricket Tournament",
      //   date: "April 5-10, 2025",
      //   description: "College level cricket tournament with teams from all departments competing for the championship trophy",
      //   venue: "College Ground"
      // },
      // {
      //   id: 2,
      //   name: "Friendly Match vs JGEC",
      //   date: "March 25, 2025",
      //   description: "Friendly cricket match against Jalpaiguri Government Engineering College to foster sports relations",
      //   venue: "JGEC Ground"
      // }
    ],
    club: {
      name: "CGEC Cricket Club",
      description: "Official cricket club of CGEC. We practice regularly and participate in various inter-college tournaments. Join us to improve your cricketing skills and be part of our winning team.",
      contact: "XXXXX@gmail.com",
      instagram: "#"
    }
  },

  football: {
    id: 2,
    name: "Football",
    icon: "fas fa-futbol",
    description: "The beautiful game - Experience the passion and excitement of football",
    news: [
      // {
      //   id: 1,
      //   title: "Football Team Reaches Semi-Finals",
      //   date: "March 12, 2025",
      //   content: "CGEC football team put up a stellar performance to reach the semi-finals of state level tournament. Great teamwork and strategy led to this achievement.",
      //   image: "/images/sports/football/news1.jpg"
      // },
      // {
      //   id: 2,
      //   title: "New Football Coach Appointed",
      //   date: "March 5, 2025",
      //   content: "Former professional player joins as our new football coach to train the team and improve our game techniques.",
      //   image: "/images/sports/football/news2.jpg"
      // }
    ],
    events: [
      // {
      //   id: 1,
      //   name: "CGEC Football League",
      //   date: "April 15-30, 2025",
      //   description: "Intra-college football league with department-wise teams competing for glory",
      //   venue: "College Football Ground"
      // },
      // {
      //   id: 2,
      //   name: "Futsal Championship",
      //   date: "March 28, 2025",
      //   description: "Fast-paced futsal competition for all football enthusiasts",
      //   venue: "Indoor Stadium"
      // }
    ],
    club: {
      name: "CGEC Football Club",
      description: "Dedicated to promoting football culture in college. Regular practice sessions and matches help players improve their skills.",
      contact: "XXXXX@gmail.com",
      instagram: "#"
    }
  },

  volleyball: {
    id: 3,
    name: "Volleyball",
    icon: "fas fa-volleyball-ball",
    description: "Teamwork and strategy - Join our volleyball team for exciting matches",
    news: [
      // {
      //   id: 1,
      //   title: "Volleyball Team Wins Bronze",
      //   date: "March 8, 2025",
      //   content: "Our volleyball team secured bronze medal in the inter-college volleyball championship. Excellent coordination and spikes led to this victory.",
      //   image: "/images/sports/volleyball/news1.jpg"
      // }
    ],
    events: [
      // {
      //   id: 1,
      //   name: "Beach Volleyball Tournament",
      //   date: "April 20, 2025",
      //   description: "Fun beach volleyball tournament for all students with exciting prizes",
      //   venue: "College Volleyball Court"
      // }
    ],
    club: {
      name: "CGEC Volleyball Club",
      description: "Promoting volleyball sports in college with regular training and competitions. Learn proper techniques and team strategies.",
      contact: "XXXXX@gmail.comn",
      instagram: "#"
    }
  },

  badminton: {
    id: 4,
    name: "Badminton",
    icon: "fas fa-table-tennis",
    description: "Fast-paced racquet sport - Perfect your skills with us",
    news: [
      // {
      //   id: 1,
      //   title: "Badminton Singles Championship",
      //   date: "March 20, 2025",
      //   content: "Annual badminton singles championship to be held next month. Registrations are now open for all students.",
      //   image: "/images/sports/badminton/news1.jpg"
      // }
    ],
    events: [
      // {
      //   id: 1,
      //   name: "Mixed Doubles Tournament",
      //   date: "April 12, 2025",
      //   description: "Exciting mixed doubles badminton tournament with team combinations",
      //   venue: "College Indoor Stadium"
      // }
    ],
    club: {
      name: "CGEC Badminton Club",
      description: "For all badminton lovers. Regular practice sessions and friendly matches help improve your game.",
      contact: "XXXXX@gmail.com",
      instagram: "#"
    }
  }
};

export const allSports = Object.values(sportsData);