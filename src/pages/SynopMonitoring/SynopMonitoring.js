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

  const [secondGraphCsvData, setSecondGraphCsvData] = useState({
    csvPath: '',
    csvContent: '',
  });
  const [secondGraphChartData, setSecondGraphChartData] = useState(null);

  // Function to fetch CSV data from the server
  const fetchSecondGraphData = async () => {
    try {
      // Fetch CSV data from the server
      const response = await fetch(
        `${process.env.REACT_APP_API}/readFile/config/csvdata`
      );
      const data = await response.json();
      // Update CSV data state
      setSecondGraphCsvData(data);

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
      setSecondGraphChartData({
        labels: downsampledData.labels,
        datasets: downsampledData.datasets,
      });
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

  // Function to downsample data by calculating the average value for every specified number of data points
  const downsampleData = (labels, datasets, factor) => {
    const downsampledLabels = [];
    const downsampledDatasets = [];
    console.log('labels.length', labels.length);
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

        // Calculate the average value for every 'factor' data points
        const averageValue = calculateAverage(
          dataset.data.slice(i, i + factor)
        );
        downsampledDatasets[index].data.push(averageValue);
      });
    }
    return { labels: downsampledLabels, datasets: downsampledDatasets };
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
