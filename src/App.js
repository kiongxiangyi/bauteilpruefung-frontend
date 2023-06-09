import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Results from './pages/Results';
import Layout from './layouts/Layout';


function App() {
  const [auftragPruefpositionen, setAuftragPruefpositionen] = useState([]);
  const selectedpruefplannummer = 1000;
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); //hook for navigation

  function handleSearch() {
    // Perform the logic of calling the API with appropriate data
    const fetchAuftragPruefpositionen = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AuftragPruefpositionen/${selectedpruefplannummer}`
        );
        const results = await response.json();
        setAuftragPruefpositionen(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuftragPruefpositionen();

    // If results is successful then navigate to /results route
     navigate('/results');
  }

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
   
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                pruefplannummer={pruefplannummer}
                handleSearch={handleSearch}
              />
            }
          />
          {/* value of path should always be in small case according to the standard */}
          <Route
            path="/results"
            element={
              <Results auftragPruefpositionen={auftragPruefpositionen} />
            }
          />
        </Routes>
      </Layout>
  );
}

export default App;
