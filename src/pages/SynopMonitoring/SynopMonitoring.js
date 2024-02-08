import React, { useState, useEffect } from 'react';
import TrafficLight from '../../components/UI/TrafficLight';
import LineChart from '../../components/UI/LineChart';
import LineChart2 from '../../components/UI/LineChart2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SynopBatchFileRunner from './SynopBatchFileRunner';
import Button from '../../components/UI/Button';
import useSSE from './useSSE';
import Checkbox from '../../components/UI/Checbox';

// Register CategoryScale for use in Chart.js
Chart.register(CategoryScale);

// Styled components for styling
const Container = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 1rem;
`;

const P = styled.p`
  text-align: center;
  margin: 0.5rem 0;
  line-height: 1.5;
  font-size: 20px;
`;

const Textarea = styled.textarea`
  font-size: 20px;
  height: 100px;
  width: 300px;
`;

const ComponentGroup = styled.div`
  border: 1px solid #ccc; /* Border color */
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding inside the box */
  width: 300px; /* Set a fixed width for the box */
  display: flex; /* Use flexbox */
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Align items horizontally at the center */
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex; /* Use flexbox */
  flex-direction: column; /* Arrange items vertically */
  margin-bottom: 10px; /* Add margin below the checkbox */
`;

const SynopMonitoring = () => {
  const navigate = useNavigate();

  // Function to handle the click on Synop Monitoring button
  const handleSynopMonitoringClick = async () => {
    try {
      const responseStopSynopProgram = await fetch(
        `${process.env.REACT_APP_API}/SynopProgram/stopSynopProgram`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!responseStopSynopProgram.ok) {
        throw new Error(
          `Failed to stop Synop program: ${responseStopSynopProgram.statusText}`
        );
      }

      const data = await responseStopSynopProgram.text();
      console.log(data); // Log response from the server

      // Execute SynopBatchFileRunner and wait for it to complete
      await SynopBatchFileRunner();

      // Display success toast
      toast.success('Aktualisiert!');

      // Navigate to the Synop-Monitoring page
      navigate('/synop-monitoring');
    } catch (error) {
      // Display error toast if an exception occurs during execution
      toast.error(
        'Bei der Ausführung des Synop-Überwachungs-Tools ist ein Fehler aufgetreten'
      );
    } finally {
      // Ensure the button is deactivated after SynopMonitoringClick
      setIsKommentarButtonActive(false);
    }
  };

  // State and functions for handling comments
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentID, setCommentID] = useState('');

  const handleCommentClick = () => {
    setShowCommentBox(true);
  };

  const handleSaveComment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/AicomEreignisse/${commentID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment: comment, // Include the comment data
            // Add any other fields you need to update
          }),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to update comment. Status: ${response.status}`);
      }

      // Reset the comment and hide the comment box after a successful update and deactivate the button
      setComment('');
      setShowCommentBox(false);
      setIsKommentarButtonActive(false);

      // Display success toast
      toast.success(`Kommentar gespeichert!`, {
        duration: 3000,
      });
    } catch (error) {
      // Handle errors, e.g., display an error toast
      console.error('Error updating comment:', error);
      toast.error('Fehler beim Speichern des Kommentars');
    }
  };

  // State for AicomEreignisse data
  const [arrAicomEreignisse, setArrAicomEreignisse] = useState([]);
  const [lastValueTrafficLight, setLastValueTrafficLight] = useState(null);
  const [commentFromDB, setCommentFromDB] = useState('');

  // Function to fetch AicomEreignisse data from the server
  const fetchtblAicomEreignisse = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/AicomEreignisse`
      );
      const result = await response.json();

      if (result && result.length > 0) {
        // Get the last result dynamically
        const lastResult = result[result.length - 1];

        setArrAicomEreignisse(result);
        setLastValueTrafficLight(lastResult.Stability);
        setCommentFromDB(lastResult.Comment);
      } else {
        // Handle the case when there is no data
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle SSE data updates
  const handleSSEData = (newSSEData) => {
    // Handle changes in SSE data
    console.log('SSE Data:', newSSEData);

    // Refetch AicomEreignisse data
    fetchtblAicomEreignisse();
  };

  // Use SSE hook to subscribe to SSE updates
  const sseData = useSSE(`${process.env.REACT_APP_API}/SynopProgram/sse`, {
    onData: handleSSEData,
    onError: (error) => {
      console.error('SSE Error:', error);
    },
  });

  const [secondGraphCsvData, setSecondGraphCsvData] = useState({
    csvPath: '',
    csvContent: '',
  });

  const [secondGraphChartData, setSecondGraphChartData] = useState(null);

  const fetchSecondGraphData = async () => {
    try {
      // Fetch CSV data from the server
      const response = await fetch(
        `${process.env.REACT_APP_API}/readFile/config/csvdata`
      );
      const data = await response.json();
      // Update CSV data state
      setSecondGraphCsvData(data);
      console.log(data);

      const lines = data.csvContent.trim().split('\n');
      const headers = lines[0].split(';');
      const datasetsMap = new Map(); // Map to store datasets for each serial number
      const millisecondsPerSecond = 1000;

      // Loop through CSV data to extract timestamps, values, and create datasets
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(';');
        const timestamp = row[0] / millisecondsPerSecond;
        const serialNumber = row[1]; // Assuming SERIALNR is in the second column
        const values = row.slice(2).map(parseFloat); // Start from the third column

        if (!datasetsMap.has(serialNumber)) {
          // Initialize dataset for each serial number
          const borderColor =
            datasetsMap.size === 0
              ? 'rgba(255, 99, 132, 1)'
              : 'rgba(54, 162, 235, 1)';

          datasetsMap.set(serialNumber, {
            label: `SerialNr ${serialNumber}`,
            data: [],
            fill: false,
            borderColor: borderColor,
            borderWidth: 1,
            pointRadius: 1,
          });
        }

        // Add a unique data point for each SerialNr and timestamp combination
        datasetsMap.get(serialNumber).data.push({
          x: timestamp,
          y: values[0], // Assuming ZActTrq is in the first column
        });
      }

      // Convert datasets map to an array
      const datasets = Array.from(datasetsMap.values());

      // Dynamically calculate downsampling factor for each serial number
      const targetPoints = 5000;
      const downsampledData = downsampleData(datasets, targetPoints);

      console.log('datasets:', datasets);
      // Log downsampling factors
      console.log('Downsampling Factors:', downsampledData.downsamplingFactors);

      // Log the actual number of target points for each unique serial number
      console.log(
        'Actual Target Points per Serial:',
        downsampledData.actualTargetPointsPerSerial
      );

      setSecondGraphChartData({
        datasets: downsampledData.datasets,
      });
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

  const downsampleData = (datasets, targetPoints) => {
    const downsampledDatasets = [];

    // Calculate downsampling factor for each serial number
    const downsamplingFactors = calculateDownsampleFactors(
      datasets,
      targetPoints
    );

    for (const dataset of datasets) {
      const factor = downsamplingFactors.get(dataset.label);
      downsampledDatasets.push({
        label: dataset.label,
        data: [],
        fill: false,
        borderColor: dataset.borderColor,
        borderWidth: 1,
        pointRadius: 1,
      });

      for (let i = 0; i < dataset.data.length; i += factor) {
        // Extract a subset of data with a specific factor
        const subset = dataset.data.slice(i, i + factor);

        //To ensure that the xmin and xmax values are in chronological order
        // Check if the subset has data
        if (subset.length > 0) {
          // Find the point with the minimum Y value in the subset
          const minYPoint = subset.reduce((prev, current) =>
            prev.y < current.y ? prev : current
          );

          // Find the point with the maximum Y value in the subset
          const maxYPoint = subset.reduce((prev, current) =>
            prev.y > current.y ? prev : current
          );

          // Determine the point with the minimum X value among minYPoint and maxYPoint
          const minXPoint = minYPoint.x < maxYPoint.x ? minYPoint : maxYPoint;

          // Determine the point with the maximum X value among minYPoint and maxYPoint
          const maxXPoint = minYPoint.x < maxYPoint.x ? maxYPoint : minYPoint;

          // Push a new data point to the downsampled dataset
          downsampledDatasets[downsampledDatasets.length - 1].data.push({
            xMin: minXPoint.x, // Use the timestamp of the first point in the subset
            yMin: minYPoint.y, // Use the minimum Y value
            yMax: maxYPoint.y, // Use the maximum Y value
            xMax: maxXPoint.x, // Use the x value corresponding to ymax
          });
        }
      }
    }

    // Calculate the actual number of target points for each unique serial number
    const actualTargetPointsPerSerial = {};
    downsampledDatasets.forEach((dataset) => {
      const serialNumber = dataset.label.split(' ')[1]; // Extract serial number
      actualTargetPointsPerSerial[serialNumber] = dataset.data.length;
    });

    return {
      datasets: downsampledDatasets,
      downsamplingFactors,
      actualTargetPointsPerSerial,
    };
  };

  // Function to calculate downsampling factor for each serial number
  const calculateDownsampleFactors = (datasets, targetPoints) => {
    const downsamplingFactors = new Map();

    for (const dataset of datasets) {
      const totalPoints = dataset.data.length;
      const factor = Math.ceil(totalPoints / targetPoints);
      downsamplingFactors.set(dataset.label, factor);
    }

    return downsamplingFactors;
  };

  // Effect hook to fetch AicomEreignisse data on component mount and SSE updates
  useEffect(() => {
    fetchtblAicomEreignisse();
  }, [sseData]);

  useEffect(() => {
    fetchSecondGraphData();
  }, [sseData]);

  // State for controlling the Kommentar button activation
  const [isKommentarButtonActive, setIsKommentarButtonActive] = useState(false);

  // Callback function to set the state in SynopMonitoring.js
  const handleKommentarButtonActivation = (isActive) => {
    setIsKommentarButtonActive(isActive);
  };

  const [werkzeugbruchChecked, setWerkzeugbruchChecked] = useState(false);
  const [geraeuscheChecked, setGeraeuscheChecked] = useState(false);
  const [spanproblemeChecked, setSpanproblemeChecked] = useState(false);
  const [sonstigeChecked, setSonstigeChecked] = useState(false);

  return (
    <div>
      <Container>
        <ButtonWrapper>
          {/* Button to trigger Synop Monitoring */}
          {/*   <Button size="small" onClick={handleSynopMonitoringClick}>
            Aktualisieren
          </Button> */}

          {/* Display TrafficLight component */}
          <ComponentGroup>
            <TrafficLight value={lastValueTrafficLight}></TrafficLight>

            {/* Display comment from the database */}
            {commentFromDB && <P>{commentFromDB}</P>}
          </ComponentGroup>

          {/* Conditionally render comment input box */}
          {showCommentBox ? (
            <>
              <CheckboxContainer>
                {/* Checkbox */}
                <Checkbox
                  id="Werkzeugbruch"
                  label="Werkzeugbruch"
                  checked={werkzeugbruchChecked}
                  onChange={(e) => setWerkzeugbruchChecked(e.target.checked)}
                />
                <Checkbox
                  id="Geräusche"
                  label="Geräusche"
                  checked={geraeuscheChecked}
                  onChange={(e) => setGeraeuscheChecked(e.target.checked)}
                />
                <Checkbox
                  id="Spanprobleme"
                  label="Spanprobleme"
                  checked={spanproblemeChecked}
                  onChange={(e) => setSpanproblemeChecked(e.target.checked)}
                />
                <Checkbox
                  id="Sonstige"
                  label="Sonstige"
                  checked={sonstigeChecked}
                  onChange={(e) => setSonstigeChecked(e.target.checked)}
                />
              </CheckboxContainer>
              {/* Comment Input Box */}
              <Textarea
                rows={4}
                cols={20}
                placeholder="Geben Sie Ihren Kommentar hier ein."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Textarea>
              <Button
                size="small"
                onClick={handleSaveComment}
                disabled={!isKommentarButtonActive}
              >
                Speichern
              </Button>
            </>
          ) : (
            <Button
              size="small"
              onClick={handleCommentClick}
              disabled={!isKommentarButtonActive}
            >
              Kommentar
            </Button>
          )}
        </ButtonWrapper>
        {/* Display LineChart component */}
        <LineChart
          arrAicomEreignisse={arrAicomEreignisse}
          onKommentarButtonActivation={handleKommentarButtonActivation}
          setCommentID={setCommentID}
        />
      </Container>

      {/* Display LineChart2 component */}
      <LineChart2 chartData={secondGraphChartData}></LineChart2>
    </div>
  );
};

export default SynopMonitoring;
