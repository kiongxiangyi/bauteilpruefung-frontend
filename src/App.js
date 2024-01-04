import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import toast, { Toaster } from 'react-hot-toast';
import Bauteilpruefung from './pages/Bauteilpruefung';
import Serialnummer from './pages/Serialnummer';
import SynopMonitoring from './pages/SynopMonitoring';
import Results from './pages/Results';
import Layout from './layouts/Layout';
import Finalpage from './pages/Finalpage';
import Menu from './pages/Menu';
import Button, { ButtonWrapper, ToastContent } from './components/UI/Button';

const API_URL = process.env.REACT_APP_API;

function App() {
  const [bauteilnummer, setBauteilnummer] = useState('');
  const [auftragPruefpositionen, setAuftragPruefpositionen] = useState([]);
  const [selectedPruefplannummer, setSelectedPruefplannummer] = useState('');
  const [auftragPruefdaten, setAuftragPruefdaten] = useState([]);
  const [selectedBauteil, setSelectedBauteil] = useState('');
  const [result, setResult] = useState([]);
  const [color, setColor] = useState([]);
  const navigate = useNavigate(); //hook for navigation
  const [picturePath, setPicturePath] = useState('');
  const [logoPath, setLogoPath] = useState('');

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
  };

  console.log(bauteilnummer);
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
          //after replace function is type string, to compare later need to change back to decimal
          let currentStringValueWithDot = event.target.value.replace(',', '.');
          let minStringValueWithDot = minWert.replace(',', '.');
          let maxStringValueWithDot = maxWert.replace(',', '.');
          return {
            ...input,
            value: event.target.value,
            bewertung:
              parseFloat(currentStringValueWithDot) >=
                parseFloat(minStringValueWithDot) &&
              parseFloat(currentStringValueWithDot) <=
                parseFloat(maxStringValueWithDot)
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
    navigate('/bauteilpruefung');
  };

  function handleSearch() {
    if (!selectedPruefplannummer) {
      toast.error('Bitte Prüfplannummer auswählen!');
    } else if (selectedPruefplannummer && !bauteilnummer) {
      toast.error('Bitte Bauteilnummer auswählen!');
    } else {
      // Perform the logic of calling the API with appropriate data
      const fetchAuftragPruefpositionen = async () => {
        try {
          const picture = await fetch(
            `${API_URL}/AuftragPruefplan/${selectedPruefplannummer}`
          );
          const pictureResult = await picture.json();
          setPicturePath(pictureResult);

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

  const createNewSerialnumber = async () => {
    if (!selectedBauteil) {
      toast.error('Bitte ein Bauteil auswählen!');
    } else {
      toast.remove(); //remove toast when selected Bauteil
      try {
        await fetch(
          `${process.env.REACT_APP_API}/Serialnummern/createNewRecord`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({ selectedBauteil }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            toast((t) => (
              <ToastContent>
                Serialnummer {data.Serialnummer} wurde erstellt.
                <ButtonWrapper>
                  <Button
                    size="small"
                    onClick={() => {
                      toast.dismiss(t.id);
                      navigate('/bauteilpruefung');
                    }}
                  >
                    Schließen
                  </Button>
                </ButtonWrapper>
              </ToastContent>
            ));
          })
          .then(() => setSelectedBauteil(''))
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (logoPath === 'No logo path is found.') {
    toast(
      (t) => (
        <ToastContent>
          Es gibt keinen Pfad des Logos.
          <ButtonWrapper>
            <Button
              size="small"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Schließen
            </Button>
          </ButtonWrapper>
        </ToastContent>
      ),
      {
        duration: Infinity, //duration of toast appearance forever
      }
    );
  } else if (logoPath === 'No such file or directory for logo.') {
    toast(
      (t) => (
        <ToastContent>
          Der angegebene Pfad des Logos ist nicht vorhanden.
          <ButtonWrapper>
            <Button
              size="small"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Schließen
            </Button>
          </ButtonWrapper>
        </ToastContent>
      ),
      {
        duration: Infinity, //duration of toast appearance forever
      }
    );
  }

  useEffect(() => {
    fetch(`${API_URL}/readFile/config/logo`)
      .then((res) => res.json())
      .then((res) => {
        setLogoPath(res);
        console.log(res);
      });

    fetch(`${API_URL}/readFile/config/color`)
      .then((res) => res.json())
      .then((rgbColors) => {
        setColor(rgbColors);
      });
  }, []);

  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [csvData, setCsvData] = useState({ csvPath: '', csvContent: '' });
  const [chartData, setChartData] = useState(null);

  const [arrAicomEreignisse, setArrAicomEreignisse] = useState([]);
  const [lastValueTrafficLight, setLastValueTrafficLight] = useState(null);

  // useEffect hook to fetch data when the component mounts and fetchDataTrigger changes
  useEffect(() => {
    // Function to fetch CSV data from the server
    const fetchCsvData = async () => {
      try {
        // Fetch CSV data from the server
        const response = await fetch(
          `${process.env.REACT_APP_API}/readFile/config/csvdata`
        );
        const data = await response.json();
        // Update CSV data state
        setCsvData(data);

        const lines = data.csvContent.trim().split('\n');
        const headers = lines[0].split(';').slice(1);
        const labels = [];
        const datasets = [];

        const millisecondsPerSecond = 1000;

        // Loop through CSV data to extract timestamps, values, and create datasets
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(';');
          const timestamp = row[0] / millisecondsPerSecond;
          const values = row.slice(1).map(parseFloat);

          labels.push(timestamp);

          values.forEach((value, index) => {
            // Initialize datasets for each header
            if (!datasets[index]) {
              datasets[index] = {
                label: headers[index],
                data: [],
                fill: false,
                borderColor: `rgba(${Math.floor(
                  Math.random() * 128
                )}, ${Math.floor(Math.random() * 128)}, ${Math.floor(
                  Math.random() * 128
                )}, 1)`,
                //borderWidth: 1,
                pointRadius: 0,
              };
            }
            // Add values to the corresponding dataset
            datasets[index].data.push(value);
          });
        }

        // Downsample data for better performance
        const downsampledData = downsampleData(labels, datasets, 800);
        // Set chart data state
        setChartData({
          labels: downsampledData.labels,
          datasets: downsampledData.datasets,
        });
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    // Function to fetch data (can be an API call, etc.)
    const fetchtblAicomEreignisse = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AicomEreignisse`
        );
        const result = await response.json();
        // Update AicomEreignisse state
        setArrAicomEreignisse(result);
        setLastValueTrafficLight(result[19].Stability); //last result is the 20th result, index start count from 0
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Function to downsample data for better performance
    const downsampleData = (labels, datasets, factor) => {
      const downsampledLabels = [];
      const downsampledDatasets = [];

      for (let i = 0; i < labels.length; i += factor) {
        downsampledLabels.push(labels[i]);

        datasets.forEach((dataset, index) => {
          if (!downsampledDatasets[index]) {
            downsampledDatasets[index] = {
              label: dataset.label,
              data: [],
              fill: false,
              borderColor: dataset.borderColor,
              borderWidth: 1,
              pointRadius: 1,
            };
          }
          downsampledDatasets[index].data.push(dataset.data[i]);
        });
      }
      return { labels: downsampledLabels, datasets: downsampledDatasets };
    };

    // Call fetchCsvData when fetchDataTrigger changes
    if (fetchDataTrigger) {
      fetchCsvData();
      fetchtblAicomEreignisse();

      // Reset the trigger after fetching data
      setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger]);

  return (
    <Layout color={color}>
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
        <Route
          path="/"
          element={<Menu setFetchDataTrigger={setFetchDataTrigger} />}
        />
        <Route
          path="/bauteilpruefung"
          element={
            <Bauteilpruefung
              handleSearch={handleSearch}
              selectedPruefplannummer={selectedPruefplannummer}
              setSelectedPruefplannummer={setSelectedPruefplannummer}
              setBauteilnummer={setBauteilnummer}
            />
          }
        />
        <Route
          path="/serialnummer"
          element={
            <Serialnummer
              createNewSerialnumber={createNewSerialnumber}
              setSelectedBauteil={setSelectedBauteil}
            />
          }
        />
        <Route
          path="/synop-monitoring"
          element={
            <SynopMonitoring
              setFetchDataTrigger={setFetchDataTrigger}
              chartData={chartData}
              arrAicomEreignisse={arrAicomEreignisse}
              lastValueTrafficLight={lastValueTrafficLight}
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
              color={color}
              picturePath={picturePath}
            />
          }
        />
        <Route
          path="/finalpage"
          element={
            <Finalpage auftragPruefdaten={auftragPruefdaten} color={color} />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
