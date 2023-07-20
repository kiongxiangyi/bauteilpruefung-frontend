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

  // Renaming handleClick to handleSave
  const handleSubmit = (e) => {
    e.preventDefault();

    auftragPruefpositionen.forEach((element) => {
      let bemerkung = document.getElementById(element.ID + '_bemerkung').value; //get value of bemerkung according to the id

      let domEleIstWert = document.getElementById(element.ID + '_istWert'); //get value of istWert according to the id
      let istWert = domEleIstWert.value;
      if (!istWert) {
        istWert = domEleIstWert.querySelector(
          'input[name="selectIstWert"]'
        ).value; //get value of options as it is not input field
        if (!istWert) {
          alert('Fehler beim auslesen des IstWerts!'); //if no options selected, alert
          return;
        }
      }

      result.push({
        id: element.ID,
        pruefplannummer: element.Pruefplannummer,
        position: element.Position,
        bezeichnung: element.Bezeichnung,
        istWert: istWert,
        bemerkung: bemerkung,
        bauteilnummer: bauteilnummer,
      });
    });
    console.log(result);

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
              result,
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setResult([]); //reset result array after writing in DB
            setBauteilnummer('');
            setAuftragPruefdaten(res);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuftragPruefdaten();

    navigate('/finalpage');
  };

  function handleSearch() {
    // Perform the logic of calling the API with appropriate data
    const fetchAuftragPruefpositionen = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AuftragPruefpositionen/${selectedPruefplannummer}`
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
