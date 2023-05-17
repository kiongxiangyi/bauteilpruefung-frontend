import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Results from "./pages/Results/Results";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
