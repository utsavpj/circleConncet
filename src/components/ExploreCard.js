import React from "react";
import "../style/ExploreCard.css";
import { Link } from "react-router-dom";

function ExploreCard({ imageSrc, title }) {
  return (
    <Link
      to={{
        pathname: `/explore/${encodeURIComponent(title)}`,
        state: { title},
      }}
      className="card-link"
    >
      <div className="card">
        <h2 className="card-title">#{title}</h2>
        <img className="card-image" src={imageSrc} alt="Card Cover" />
      </div>
    </Link>
  );
}

export default ExploreCard;
