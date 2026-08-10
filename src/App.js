import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import NavBar from "./components/NavBar";
import About from "./components/About";
import NewsPage from "./components/NewsPage";
import ClubSection from "./components/ClubSection";
import EventSection from "./components/EventSection";
import TeamPage from "./components/TeamPage";

import FestGallery from "./components/FestGallery/FestGallery";
import SportsPage from "./components/SportsPage/SportsPage";
import InterviewsPage from "./components/InterviewsPage/InterviewsPage";
import AcademicEventsPage from "./components/AcademicEventsPage/AcademicEventsPage";
import AcademicEventDetailsPage from "./components/AcademicEventsPage/EventDetailsPage";
import ClubDetailsPage from "./components/ClubDetailsPage";
import EventDetailsPage from "./components/EventDetailsPage";
import CommitteesPage from "./components/CommitteesPage/CommitteesPage";
import AllEventsPage from "./components/AllEventsPage";
import NewsDetailsPage from "./components/NewsDetailsPage";

import NewsletterPage from "./components/PublicationsPage/NewsletterPage";
import MagazinePage from "./components/PublicationsPage/MagazinePage";
import AnnualReportPage from "./components/PublicationsPage/AnnualReportPage";
import ResearchPapersPage from "./components/PublicationsPage/ResearchPapersPage";
import ReadNewsletterPage from "./components/PublicationsPage/ReadNewsletterPage";

import PaperReader from "./components/PaperReader";
import LoginPage from "./components/LoginPage";
import LoginHistory from "./components/LoginHistory";
import SignupPage from "./components/SignupPage";
import AdminDashboard from "./components/AdminDashboard";

import VerifyCertificate from "./components/VerifyCertificate";

import "./App.css";

const ADMIN_SESSION_KEY = "adminSessionActive";
const LAST_ACTIVITY_KEY = "lastAdminActivity";
const IDLE_LIMIT = 20 * 60 * 1000;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="container text-center py-5">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" replace />;
};

const Home = () => (
  <>
    <About />
    <NewsPage />
    <ClubSection />
    <EventSection />
    <TeamPage />
  </>
);

function AppWrapper() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => setProgress(100), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const updateActivity = () => {
      if (localStorage.getItem("isAdmin") === "true") {
        localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
      }
    };

    const checkIdleTime = () => {
      const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (!lastActivity) return;

      const diff = Date.now() - parseInt(lastActivity, 10);

      if (diff >= IDLE_LIMIT) {
        localStorage.removeItem("isAdmin");
        localStorage.removeItem(ADMIN_SESSION_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        alert("You have been logged out due to inactivity.");
        window.location.href = "/login";
      }
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("scroll", updateActivity);

    const interval = setInterval(checkIdleTime, 60000);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("scroll", updateActivity);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <>
      <ScrollToTop />
      <LoadingBar color="#B10E29" progress={progress} height={3} />

      {!isAuthPage && <NavBar />}

      <main>
        <Routes>

          <Route path="/" element={<Home />} />
          

          <Route path="/verify-certificate" element={<VerifyCertificate />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-history" element={<LoginHistory />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/news" element={<NewsPage />} />
          <Route path="/news-details/:newsId" element={<NewsDetailsPage />} />

          <Route path="/publications/newsletter" element={<NewsletterPage />} />
          <Route path="/read-paper/:id" element={<ReadNewsletterPage />} />

          <Route path="/publications/magazine" element={<MagazinePage />} />
          <Route path="/publications/annualReport" element={<AnnualReportPage />} />
          <Route path="/publications/researchPapers" element={<ResearchPapersPage />} />

          <Route path="/read-paper/:monthId" element={<PaperReader />} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/clubs" element={<ClubSection />} />
          <Route path="/club/:id" element={<ClubDetailsPage />} />

          <Route path="/events" element={<EventSection />} />
          <Route path="/all-events" element={<AllEventsPage />} />
          <Route path="/event-details/:eventId" element={<EventDetailsPage />} />

          <Route path="/team" element={<TeamPage />} />
          <Route path="/fest-gallery" element={<FestGallery />} />

          <Route path="/academic-events/:eventType" element={<AcademicEventsPage />} />
          <Route path="/academic-events/:eventType/:eventId" element={<AcademicEventDetailsPage />} />

          <Route path="/sports/:sportName" element={<SportsPage />} />
          <Route path="/committees/:committeeType" element={<CommitteesPage />} />
          <Route path="/interviews/:interviewType" element={<InterviewsPage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;