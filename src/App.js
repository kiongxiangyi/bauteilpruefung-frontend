import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import toast, { Toaster } from 'react-hot-toast';
import Homepage from './pages/Homepage';
import Results from './pages/Results';
import Layout from './layouts/Layout';
import Finalpage from './pages/Finalpage';
import Menu from './pages/Menu';

const API_URL = process.env.REACT_APP_API;

function App() {
  const [bauteilnummer, setBauteilnummer] = useState('');
  const [auftragPruefpositionen, setAuftragPruefpositionen] = useState([]);
  const [selectedPruefplannummer, setSelectedPruefplannummer] = useState('');
  const [auftragPruefdaten, setAuftragPruefdaten] = useState([]);
  const [result, setResult] = useState([]);
  const [logoPath, setLogoPath] = useState('');

  const navigate = useNavigate(); //hook for navigation

  const handleIstWertChange = (id, newIstWert) => {
    setAuftragPruefpositionen((prevData) => {
      return prevData.map((item) => {
        if (item.ID === id) {
          return {
            ...item,
            value: newIstWert,
            bewertung:
              newIstWert >= item.minWert && newIstWert <= item.maxWert
                ? 'okay'
                : 'not okay',
          };
        }
        return item;
      });
    });
    console.log(auftragPruefpositionen);
  };

  const handleInputChange = (id, KeineWerteingabe, event, minWert, maxWert) => {
    setAuftragPruefpositionen(
      auftragPruefpositionen.map((input) => {
        //if id not the same, return the original values
        if (input.ID !== id) {
          return input;
        }

        //if changes in select, update value of SelectRow options
        if (event.name === 'select' && KeineWerteingabe) {
          return {
            ...input,
            value: event.value,
            bewertung: event.value === 'i.O' ? 'i.O' : 'n.i.O',
          };
          //if changes in value, update value
        } else if (
          event.target.name === 'value' &&
          KeineWerteingabe === false
        ) {
          return {
            ...input,
            value: event.target.value,
            bewertung:
              event.target.value.replace(',', '.') >=
                minWert.replace(',', '.') &&
              event.target.value.replace(',', '.') <= maxWert.replace(',', '.')
                ? 'i.O'
                : 'n.i.O',
          };
          //if changes in remarks, update remarks
        } else if (event.target.name === 'bemerkung') {
          return {
            ...input,
            bemerkung: event.target.value,
          };
        }
      })
    );
  };
  // Renaming handleClick to handleSave
  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i = 0; i < auftragPruefpositionen.length; i++) {
      if (auftragPruefpositionen[i].value === '') {
        toast.error('Bitte alle Ergebnisse eingeben!');
        return;
      }
    }

    const fetchAuftragPruefdaten = async () => {
      try {
        await fetch(`${API_URL}/AuftragPruefdaten/createNewRecords`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            auftragPruefpositionen,
            bauteilnummer,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setAuftragPruefdaten(res);
            setBauteilnummer('');
            navigate('/finalpage'); //sucess then go next page
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    };
    fetchAuftragPruefdaten();
  };

  const handleClickPreviousPage = () => {
    setSelectedPruefplannummer('');
    setBauteilnummer('');
    navigate('/homepage');
  };

  function handleSearch() {
    if (!selectedPruefplannummer) {
      toast.error('Bitte Prüfplannummer auswählen!');
    } else if (selectedPruefplannummer && !bauteilnummer) {
      toast.error('Bitte Bauteilnummer eingeben!');
    } else {
      // Perform the logic of calling the API with appropriate data
      const fetchAuftragPruefpositionen = async () => {
        try {
          const response = await fetch(
            `${API_URL}/AuftragPruefpositionen/${selectedPruefplannummer}`
          );
          const results = await response.json();

          const newResults = results.map((item) => ({
            ...item,
            value: '',
            //value: item.KeineWerteingabe ? { value: '', label: '' } : '', // your default value
            bemerkung: '', // your default remarks
            bewertung: '',
          }));

          setAuftragPruefpositionen(newResults);

          // If results is successful then navigate to /results route
          navigate('/results');
        } catch (err) {
          console.log(err);
          toast.error(err);
        }
      };

      fetchAuftragPruefpositionen();
    }
  }

  useEffect(() => {
    fetch(`${API_URL}/readFile/config`)
      .then((res) => res.json())
      .then((data) => {
        setLogoPath(data.logoPath);
      });
  }, []);

  //console.log(logoPath);

  return (
    <Layout>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid',
            fontSize: '30px',
            maxWidth: 1000,
          },
        }}
      />
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/homepage"
          element={
            <Homepage
              handleSearch={handleSearch}
              selectedPruefplannummer={selectedPruefplannummer}
              setSelectedPruefplannummer={setSelectedPruefplannummer}
              setBauteilnummer={setBauteilnummer}
              logoPath={logoPath}
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
              handleClickPreviousPage={handleClickPreviousPage}
              handleIstWertChange={handleIstWertChange}
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
