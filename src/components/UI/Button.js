import React from "react";
import "./UI.css";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate(); //hook for navigation

  return (
    <div className="flex">
      <button className="button" onClick={() => navigate("/Results")}>
        Search
      </button>
    </div>
  );
}
