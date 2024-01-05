// Import necessary libraries and components
import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import 'chartjs-adapter-moment';
import styled from 'styled-components';

// Define a styled div for the chart container
const ChartContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 700px; /* Adjust the height as needed */
  margin: 50px 0;
`;

const LineChart = ({ arrAicomEreignisse }) => {
  // Receive the array of data as a prop

  // Extracting all data from the array
  const limitedDataset = arrAicomEreignisse;

  // Prepare an object to organize the data by FeatureID
  const datasets = {};

  // Loop through each entry in the dataset
  limitedDataset.forEach((entry) => {
    // If the FeatureID is not yet present in the datasets object, initialize it
    if (!datasets[entry.FeatureID]) {
      datasets[entry.FeatureID] = {
        label: entry.FeatureID,
        data: [], // Initialize an array to store data points
        borderColor: 'rgba(0, 0, 128, 1)',
        fill: false,
      };
    }

    // Convert the date string to a JavaScript Date object using moment.js
    const dateObject = moment(entry.Date).toDate();

    // Push a new data point into the array for the current FeatureID
    datasets[entry.FeatureID].data.push({
      x: dateObject, // x-axis value (date)
      y: entry.Stability, // y-axis value
      dbComment: entry.Comment, // Additional data (dbComment) associated with the data point
    });
  });

  // Prepare the data structure for the Chart.js Line component
  const chartData = {
    datasets: Object.values(datasets).map((dataset) => ({
      ...dataset,
      // Extract dbComment from data array and add it as a property at the dataset level
      dbComment: dataset.data.map((dataPoint) => dataPoint.dbComment),
    })),
  };

  // Chart.js options configuration
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'YYYY-MM-DD HH:mm:ss',
          },
        },
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            // Custom label format for the tooltip
            const label = context.dataset.label || '';
            const x = moment(context.parsed.x).format('YYYY-MM-DD HH:mm:ss');
            const y = context.parsed.y;
            const dbComment = context.dataset.dbComment[context.dataIndex];

            return `Startzeit: ${x}; Stabilität: ${y}; Kommentar: ${dbComment}`;
          },
        },
      },
    },
  };

  // Render the LineChart component
  return (
    <ChartContainer>
      <h2>Stabilität</h2>
      <Line data={chartData} options={options} />
    </ChartContainer>
  );
};

// Export the LineChart component as the default export
export default LineChart;
