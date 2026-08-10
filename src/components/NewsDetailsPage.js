import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import "./NewsDetailsPage.css";

const NewsDetailsPage = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", newsId)
        .single();

      if (!error) setNews(data);
    };

    fetchNews();
    window.scrollTo(0, 0);
  }, [newsId]);

  if (!news) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container py-5">

      <Link to="/news" className="btn btn-secondary mb-3">
        ← Back
      </Link>

      <div className="card shadow p-4">
        <img
  src={news.image}
  alt="news"
  className="w-100 mb-3"
  style={{ maxHeight: "400px", objectFit: "contain" }}
/>

        <span className="badge bg-danger">{news.category}</span>
        <h1 className="mt-3">{news.title}</h1>
        <p className="text-muted">{news.date}</p>

        <p>{news.content}</p>
      </div>

    </div>
  );
};

export default NewsDetailsPage;