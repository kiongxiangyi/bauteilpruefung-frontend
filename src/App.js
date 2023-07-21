import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Results from './pages/Results';
import Layout from './layouts/Layout';
import Finalpage from './pages/Finalpage';

function App() {
  const [bauteilnummer, setBauteilnummer] = useState('');
  const [auftragPruefpositionen, setAuftragPruefpositionen] = useState([]);
  const [selectedPruefplannummer, setSelectedPruefplannummer] = useState('');
  const [auftragPruefdaten, setAuftragPruefdaten] = useState([]);
  const [result, setResult] = useState([]);
  const navigate = useNavigate(); //hook for navigation

  const handleInputChange = (id, KeineWerteingabe, event) => {
    setAuftragPruefpositionen(
      auftragPruefpositionen.map((input) => {
        if (input.ID !== id) {
          return input;
        }

        if (KeineWerteingabe) {
          return { ...input, value: event.value };
        } else {
          return { ...input, value: event.target.value };
        }
      })
    );
  };
  // Renaming handleClick to handleSave
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('auftragPruefpositionen', auftragPruefpositionen);

    const fetchAuftragPruefdaten = async () => {
      try {
        await fetch(
          `${process.env.REACT_APP_API}/AuftragPruefdaten/createNewRecords`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              auftragPruefpositionen,
              bauteilnummer,
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setAuftragPruefdaten(res);
            setBauteilnummer('');
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };

    console.log(auftragPruefdaten);
    fetchAuftragPruefdaten();

    //navigate('/finalpage');
  };

  function handleSearch() {
    // Perform the logic of calling the API with appropriate data
    const fetchAuftragPruefpositionen = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AuftragPruefpositionen/${selectedPruefplannummer}`
        );
        const results = await response.json();

        const newResults = results.map((item) => ({
          ...item,
          value: '',
          //value: item.KeineWerteingabe ? { value: '', label: '' } : '', // your default value
          bemerkung: '', // your default remarks
        }));

        setAuftragPruefpositionen(newResults);
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
              setSelectedPruefplannummer={setSelectedPruefplannummer}
              bauteilnummer={bauteilnummer}
              setBauteilnummer={setBauteilnummer}
            />
          }
        />
        {/* value of path should always be in small case according to the standard */}
        <Route
          path="/results"
          element={
            <Results
              auftragPruefpositionen={auftragPruefpositionen}
              handleSubmit={handleSubmit}
              setResult={setResult}
              result={result}
              handleInputChange={handleInputChange}
            />
          }
        />
        <Route
          path="/finalpage"
          element={<Finalpage auftragPruefdaten={auftragPruefdaten} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
