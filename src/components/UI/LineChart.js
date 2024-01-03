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
  // Limit the dataset to the last 20 results
  const limitedDataset = arrAicomEreignisse.slice(-20);

  const datasets = {};

  limitedDataset.forEach((entry) => {
    if (!datasets[entry.FeatureID]) {
      datasets[entry.FeatureID] = {
        label: entry.FeatureID,
        data: [],
        borderColor: 'rgba(0, 0, 128, 1)',
        fill: false,
      };
    }

    const dateObject = moment(entry.Date).toDate();

    datasets[entry.FeatureID].data.push({
      x: dateObject,
      y: entry.Stability,
    });
  });

  const chartData = {
    datasets: Object.values(datasets),
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'YYYY-MM-DD HH:mm:ss.SSS',
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
            const label = context.dataset.label || '';
            const value = context.parsed.y;

            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <ChartContainer>
      <h2>Stability Chart</h2>
      <Line data={chartData} options={options} />
    </ChartContainer>
  );
};

export default LineChart;
