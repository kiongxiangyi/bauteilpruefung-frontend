import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Results from './pages/Results';
import Layout from './layouts/Layout';

function App() {
  const [pruefplannummer, setPruefplannummer] = useState([]);

  useEffect(() => {
    // let interval; // interval tutorial - https://www.codingdeft.com/posts/react-useeffect-hook/
    const fetchPruefplan = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AuftragPruefplan`
        );
        const results = await response.json();
        setPruefplannummer(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPruefplan();

    const interval = setInterval(() => {
      fetchPruefplan();
    }, 1 * 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Homepage pruefplannummer={pruefplannummer} />}
          />
          {/* value of path should always be in small case according to the standard */}
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
