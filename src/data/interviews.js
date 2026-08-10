

export const interviewsData = {
  online: {
    id: 1,
    type: "Online",
    icon: "fas fa-wifi",
    description: "Virtual interviews conducted through online platforms",
    interviews: [
      // {
      //   id: 1,
      //   title: "",
      //   date: "",
      //   company: "",
      //   position: "",
      //   participants: ["", "", ""],
      //   content: "",
      //   image: "",
      //   platform: "",
      //   status: "",
      //   outcome: ""
      // },
      
    ],
    statistics: {
      totalInterviews: "XX",
      companies: ["", "", "", "", "", ""],
      successRate: "XX%",
      upcoming: "X"
    }
  },

  offline: {
    id: 2,
    type: "Offline",
    icon: "fas fa-globe",
    description: "On-campus interviews and recruitment drives",
    interviews: [
      
      // {
      //   id: 1,
      //   title: "",
      //   date: "",
      //   company: "",
      //   position: "",
      //   participants: [""],
      //   content: "",
      //   image: "",
      //   venue: "",
      //   status: "",
      //   outcome: ""
      // }
    ],
    statistics: {
      totalInterviews: "XX",
      companies: ["", "", "", "", "", ""],
      successRate: "XX%",
      upcoming: "X"
    }
  }
};

export const allInterviews = Object.values(interviewsData);