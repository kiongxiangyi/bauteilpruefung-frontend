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
  margin: 0.5rem 0;
  font-size: 20px;
`;

const SynopMonitoring = () => {
  const navigate = useNavigate();

  // Function to handle the click on Synop Monitoring button
  const handleSynopMonitoringClick = async () => {
    try {
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
    }
  };

  // State and functions for handling comments
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleCommentClick = () => {
    setShowCommentBox(true);
  };

  const handleSaveComment = () => {
    // Save or use the comment data as needed
    toast.success(`Kommentar gespeichert!`, {
      duration: 3000,
    });

    // Optionally, you can reset the comment and hide the comment box after saving
    setComment('');
    setShowCommentBox(false);
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
  const sseData = useSSE(`${process.env.REACT_APP_API}/runSynopProgram/sse`, {
    onData: handleSSEData,
    onError: (error) => {
      console.error('SSE Error:', error);
    },
  });

  //Set chart data state
  /* setSecondGraphChartData({
        datasets,
      }); */

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
      const targetPoints = 10000;
      const downsampledData = downsampleData(datasets, targetPoints);

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
        const subset = dataset.data.slice(i, i + factor);
        if (subset.length > 0) {
          const averageValue = calculateAverage(subset.map((point) => point.y));
          downsampledDatasets[downsampledDatasets.length - 1].data.push({
            x: subset[0].x, // Use the timestamp of the first point in the subset
            y: averageValue,
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

  // Helper function to calculate the average value of an array
  const calculateAverage = (arr) => {
    if (arr.length === 0) {
      return 0;
    }
    const sum = arr.reduce((total, value) => total + value, 0);
    return sum / arr.length;
  };

  // Effect hook to fetch AicomEreignisse data on component mount and SSE updates
  useEffect(() => {
    fetchtblAicomEreignisse();
  }, [sseData]);

  useEffect(() => {
    fetchSecondGraphData();
  }, []);

  return (
    <div>
      <Container>
        <ButtonWrapper>
          {/* Button to trigger Synop Monitoring */}
          <Button size="small" onClick={handleSynopMonitoringClick}>
            Aktualisieren
          </Button>

          {/* Display TrafficLight component */}
          <TrafficLight value={lastValueTrafficLight}></TrafficLight>

          {/* Display comment from the database */}
          {commentFromDB && <P>{commentFromDB}</P>}

          {/* Conditionally render comment input box */}
          {showCommentBox ? (
            <>
              <Textarea
                rows={4}
                cols={20}
                placeholder="Geben Sie Ihren Kommentar hier ein."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Textarea>
              <Button size="small" onClick={handleSaveComment}>
                Speichern
              </Button>
            </>
          ) : (
            <Button size="small" onClick={handleCommentClick}>
              Kommentar
            </Button>
          )}
        </ButtonWrapper>

        {/* Display LineChart component */}
        <LineChart arrAicomEreignisse={arrAicomEreignisse} />
      </Container>

      {/* Display LineChart2 component */}
      <LineChart2 chartData={secondGraphChartData}></LineChart2>
    </div>
  );
};

export default SynopMonitoring;
