// App.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

// Define a styled div for the chart container
const ChartContainer = styled.div`
  margin: 50px;
`;

function App() {
  // State to store CSV data and chart data
  const [, setCsvData] = useState({ csvPath: '', csvContent: '' });
  const [chartData, setChartData] = useState(null);

  // Fetch CSV data on component mount
  useEffect(() => {
    fetchCsvData();
  }, []);

  // Function to fetch CSV data from the server
  const fetchCsvData = async () => {
    try {
      // Fetch CSV data from the server
      const response = await fetch(
        `${process.env.REACT_APP_API}/readFile/config/csvdata`
      );
      const data = await response.json();
      setCsvData(data);

      // Process CSV data and create chart data
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
                Math.random() * 256
              )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
              )}, 1)`, // Dark blue color
              borderWidth: 1, // Adjust borderWidth as needed
              pointRadius: 0, // Set pointRadius to 0 for downsampling
            };
          }
          // Add values to the corresponding dataset
          datasets[index].data.push(value);
        });
      }

      // Downsample data for better performance
      const downsampledData = downsampleData(labels, datasets, 800); // Adjust the downsampling factor as needed

      // Set chart data state
      setChartData({
        labels: downsampledData.labels,
        datasets: downsampledData.datasets,
      });
    } catch (error) {
      console.error('Error fetching CSV data:', error);
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
            borderWidth: 1, // Adjust borderWidth as needed
            pointRadius: 1, // Adjust pointRadius as needed
          };
        }
        downsampledDatasets[index].data.push(dataset.data[i]);
      });
    }
    return { labels: downsampledLabels, datasets: downsampledDatasets };
  };

  // Render the component
  return (
    <ChartContainer>
      {chartData && (
        <div>
          {/* Chart title */}
          <h2>Signalverläufe der Auffälligkeit</h2>
          {/* Line chart component */}
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                    maxTicksLimit: 10, // Adjust the number of ticks as needed
                    stepSize: 1, // Display seconds in increments of 1
                    callback: (value) => `${value}s`,
                  },
                },
                y: {
                  // Adjust y-axis configuration as needed
                },
              },
              elements: {
                point: {
                  radius: 1, // Adjust the pointRadius value
                },
              },
            }}
          />
        </div>
      )}
    </ChartContainer>
  );
}

export default App;
