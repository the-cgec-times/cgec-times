

import AutoCAD2D from "../assets/academicEvents/AutoCAD2D.jpeg";
import Graphic_Designing from "../assets/academicEvents/Graphic_Designing.jpeg";
import  Tech_Exhibition from "../assets/academicEvents/Tech-Exhibition.jpeg";
import  CircuitQuest from "../assets/academicEvents/CircuitQuest.jpeg";
import  Code_A_Thon from "../assets/academicEvents/Code-A-Thon.jpeg";
import  CraftyCAD from "../assets/academicEvents/CraftyCAD.jpeg";
import  DevDraw from "../assets/academicEvents/DevDraw.jpeg";
import  Hackathon from "../assets/academicEvents/Hackathon.jpeg";
import  PES from "../assets/academicEvents/PES.jpeg";
import  Prompt_Competition from "../assets/academicEvents/Prompt_Competition.jpeg";
import  Tech_Quiz_Technovista from "../assets/academicEvents/Tech_Quiz_Technovista.jpeg";
import  techApti_Quiz from "../assets/academicEvents/tech&Apti_Quiz.jpeg";
// import { register } from "swiper/element";

export const academicEventsData = {
  techFest: {
    name: "ByteBurst",
    icon: "fas fa-rocket",
    description:
      "The annual technical extravaganza of CGEC where innovation meets implementation.",
    categories: ["Tech Exhibition", "Graphic Designing", "AutoCAD 2D", "Techno Commercial Project", "Code-a-Thon", "Hackathon", "Tech&Apti Quiz", "PES", "Prompt Competition"],

    upcomingEvents: [

    ],

    completedEvents: [
      {
       id: 1,
        slug: "#",
        title: "Tech Exhibition",
        status: "Completed", 

        date: "8 March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description:"The Tech Exhibition marked the grand opening of BYTEBURST 2025, bringing together students from all academic years and departments to showcase innovative technological projects. The exhibits ranged from robotics and hardware systems to advanced AI-based applications, reflecting the participants’ creativity, technical depth, and problem-solving skills.",

        image: Tech_Exhibition,  

        highlights: [
          "Pre-event workshop on effective project presentation and Wide range of futuristic and application-oriented projects",
          
        ],

        rules: [
          "Projects had to be presented following guidelines shared in the preparatory workshop",
          
        ],
      },
      {
        id: 2,
        slug: "#",
        title: "Graphic Designing Competition",
        status: "Completed", 

        date: "8 March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description: "The Graphic Designing Competition provided a platform for students to explore the creative side of technology. Participants showcased digital artwork that blended aesthetics with technical execution, emphasizing design thinking and visual storytelling.",


        image: Graphic_Designing,  

        highlights: [
          "Pre-competition workshop on industry-level design principles",
          
        ],

        rules: [
          "Designs evaluated based on originality, technical execution, and visual impact",
          
        ],
      },
      {
        id: 3,
        slug: "#",
        title: "AutoCAD 2D Challenge",
        status: "Completed", 

        date: "8 March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description: "The AutoCAD 2D Challenge was organized to strengthen digital drafting skills among Civil and Mechanical Engineering students. Separate categories ensured discipline-specific exposure, allowing participants to apply AutoCAD fundamentals to technical drawing tasks.",


        image: AutoCAD2D,  

        highlights: [
          "Separate segments for Civil (CE) and Mechanical (ME) Engineering and Multiple preparatory workshops for beginners",
          
        ],

        rules: [
          "Designs judged on accuracy, efficiency, and execution",
          
        ],
      },
      {
        id: 4,
        slug: "#",
        title: "Techno-Commercial Project Challenge",
        status: "Completed", 

        date: "8 March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description: "Designed for Electronics and Electrical Engineering students, this competition combined technical innovation with commercial viability. Participants fabricated functional circuits while optimizing cost, efficiency, and performance under real-world constraints.",


        image: "#",  

        highlights: [
          "Hands-on circuit design and fabrication",
          
        ],

        rules: [
          "Circuits had to meet specified input-output requirements",
          
        ],
      },
      {
        id: 5,
        slug: "#",
        title: "Code-a-thon",
        status: "Completed", 

        date: "8th March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description: "The Code-a-thon tested participants’ programming skills through time-bound algorithmic challenges. It aimed to nurture competitive programming culture and prepare students for industry-level problem-solving and global coding contests.",


        image: Code_A_Thon,  

        highlights: [
          "Pre-event problem-solving workshop and Focus on speed, logic, and optimization",
          
        ],

        rules: [
          "Judged on algorithmic efficiency, code readability, and test cases passed",
          
        ],
      },
      {
        id: 6,
        slug: "#",
        title: "Hackathon",
        status: "Completed", 

        date: "9 March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description: "One of the flagship events of BYTEBURST 2025, the Hackathon brought together interdisciplinary teams to build real-life solutions from scratch. Participants selected problem statements spanning AI, IoT, sustainability, and smart systems.",


        image: Hackathon,  

        highlights: [
          "28 diverse problem statements including Open Innovation and Projects developed end-to-end within 12 hours",
          
        ],

        rules: [
          "Projects judged on tech stack, feasibility, and real-world applicability",
          
        ],
      },
      {
        id: 7,
        slug: "#",
        title: "Tech & Apti Quiz",
        status: "Completed", 

        date: "9th March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description: "The Tech & Apti Quiz challenged participants’ technical awareness and aptitude skills through a fast-paced, time-bound format. It tested both theoretical knowledge and logical reasoning abilities.",


        image: techApti_Quiz,  

        highlights: [
          "Questions on aptitude, logical reasoning, and emerging technologies and Emphasis on speed and accuracy",
          
        ],

        rules: [
          "Time-bound rounds with elimination based on performance",
          
        ],
      },
      {
        id: 8,
        slug: "#",
        title: "PES (eFootball) Tournament",
        status: "Completed", 

        date: "9th March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description: "The only esports event of BYTEBURST 2025, the PES Tournament brought together gaming enthusiasts for intense football simulations using eFootball. Strategy, reflexes, and adaptability defined the competition.",


        image: PES,  

        highlights: [
          "Rishiraj Das Ghosh and Arijit Sinha Mahapatra were the finalists and the latter was the winner",
          
        ],

        rules: [
          "Knockout format with elimination rounds",
          
        ],
      },
      {
        id: 9,
        slug: "#",
        title: "Prompt Competition",
        status: "Completed", 

        date: "9th March, 2025",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description:"The concluding event of BYTEBURST 2025 focused on the emerging skill of AI prompt engineering. Participants demonstrated creativity and precision while interacting with AI tools across multiple rounds.",


        image: Prompt_Competition,  

        highlights: [
          "There were Three rounds: 1. Poem generation using ChatGPT 2. Song creation using Suno AI 3. Reverse prompting using Leonardo.Ai",
          
        ],

        rules: [
          "Only one prompt was allowed in the Reverse Prompting round",
          
        ],
      },
        {
       id: 10,
        slug: "#",
        title: "ByteBurst",
        status: "Completed", 

        date: "15 april 2026",
        venue: "CGEC Campus",
        organizer: "Tech-O-Nicks",  

        description:"A Tech Saga Chapter III is on its way — where ideas collide, skills ignite, and brilliance takes center stage.",

        image: "#",  

        highlights: [
          "🚀 Something BIG is coming…  Get ready to witness innovation, creativity, and pure tech adrenaline like never before! 💻⚡ ByteBurst : A Tech Saga Chapter III is on its way — where ideas collide, skills ignite, and brilliance takes center stage.From thrilling competitions to mind-blowing challenges, this mini tech fest is going to be 🔥 📅 Stay tuned… Dates and details dropping soon!Are you ready to burst into the world of tech?  👀#ByteBurst #ComingSoon #TechFestVibes",
          
        ],

        rules: [
          "Projects had to be presented following guidelines shared in the Whatsapp Group",
          
        ],
        register_link:"#!",
      },
      
    ],
  },




  
  innovision: {  
    name: "Technovista",
    icon: "fas fa-lightbulb",
    description:
      "Innovision is CGEC’s innovation & startup focused event celebrating creativity and ideas.",
    
    categories: [
      "Tech Quiz",
      "Code-A-Thon",
      "CircuitQuest",
      "CraftyCAD",
      "devDraw"
    ],

    upcomingEvents: [],

    completedEvents: [
         {
        id: 1,
        slug: "#",
        title: "Tech Quiz",
        status: "Completed",

        date: "29th January, 2025",
        venue: "CGEC CAMPUS",
        organizer: "Tech-O-Nicks",  

        description:"The Tech-Quiz was one of the two competitions organized on the first day of Technovista – The Multitech Challenge. Designed to test participants’ technical knowledge, the quiz evaluated students across a wide spectrum of topics, including technology and physics.",


        image: Tech_Quiz_Technovista,  
         winners: {   
    first:[ "Debojit Sarkar", " 1st year", "CSE"],
    second:[ "Satyajit Roy"," 1st year", "CSE"],
    third: "—"
  },

        highlights: [
          "Debojit Sarkar was the Winner and Satyajit Roy was the Runner-up",
          
        ],

        rules: [
          "It had a Three-round elimination format",
          
        ],
      },
      {
        id: 2,
        slug: "#",
        title: "Code-A-Thon",
        status: "Completed",

        date: "29th January, 2025",
        venue: "CGEC CAMPUS",
        organizer: "Tech-O-Nicks",  

        description:"The Code-a-Thon provided a competitive environment for students to test their programming and problem-solving skills. The event aimed to encourage participants to explore algorithmic thinking and apply computational logic to solve real-world challenges.",


        image: "#", 
        winners: {   
    first:[ "Subhradeep Deb", " 2nd year", "CSE"],
    second:[ "Anirudha Ghosh"," 1st year", "CSE"],
    third: "—"
  }, 

        highlights: [
          "Subhradeep Deb was the Winner and Anirudha Ghosh was the Runner-up",
          
        ],

        rules: [
          "#",
          
        ],
      },
      {
        id: 3,
        slug: "#",
        title: "CircuitQuest",
        status: "Completed", 

        date: "30th January, 2025",
        venue: "CGEC CAMPUS",
        organizer: "Tech-O-Nicks",  

        description:"CircuitQuest was organized on the second day of Technovista as an online competition focused on circuit design and practical application of electrical concepts. The event challenged participants to apply theoretical knowledge to real-world problem-solving scenarios through hands-on circuit design tasks.",


        image: CircuitQuest,  
         winners: {   
    first:[ "Debojit Sarkar", " 1st year", "CSE"],
    second:[ "Chayan Barman"," 1st year", "ME"],
    third: "—"
  },

        highlights: [
          "Debojit Sarkar was the Winner and Chayan Barman was the Runner-up",
          
        ],

        rules: [
          "All four circuits provided to the participants had to be completed. The participants were required to present and justify their designs during the evaluation session",
          
        ],
      },
      {
        id: 4,
        slug: "#",
        title: "CraftyCAD",
        status: "Completed", 

        date: "30th January, 2025",
        venue: "CGEC CAMPUS",
        organizer: "Tech-O-Nicks",  

        description:"CraftyCad was organized to assess students’ proficiency in AutoCAD through design-based challenges. The competition provided participants with a set of problem statements, followed by an interactive session that allowed them to explain and refine their designs.",


        image: CraftyCAD,  

        winners: {   
    first:[ "Subhrowjyoti Barman", " 2nd year", "CE"],
    second:[ "Sujiy Dey"," 2nd year", "CE"],
    third: "—"
  }, 

        highlights: [
          "Subhrowjyoti Barman was the Winner, Sujoy Dey was the Runner-up and Sudipa Pal was the best performer from first-year",
          
        ],

        rules: [
        "Participants were required to solve the given design problems and the designs were evaluated during the interactive session",
          
        ],
      },
      {
        id: 5,
        slug: "#",
        title: "devDraw",
        status: "Completed", 

        date: "31st January, 2025",
        venue: "CGEC CAMPUS",
        organizer: "Tech-O-Nicks",  

        description:"Dev Draw 2.0 was organized on the third day of Technovista to bring together aspiring developers and creative designers on a single platform. The competition focused on enhancing web development skills while encouraging participants to approach problem statements with creativity and practical thinking.",


        image: DevDraw,  
winners: {   
    first:[ "Rajat Mondal", " 1st year", "CSE"],
    second:[ "Satyajit Roy"," 1st year", "CSE"],
    third: "—"
  }, 
        highlights: [
          "Rajat Mondal was the Winner and Satyajit Roy was the Runner-up",
          
        ],

        rules: [
        "Websites were required to be presented to the judging panel after completion",
          
        ],
      }
    ],
  },


};
