import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import styled from 'styled-components';
import moment from 'moment';

// Styled component for the chart container
const ChartContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 700px;
  margin: 20px 20px;
`;

// LineChart component
const LineChart = ({ arrAicomEreignisse }) => {
  // Check if there is no data
  if (!arrAicomEreignisse || arrAicomEreignisse.length === 0) {
    // Render a message when there is no data
    return (
      <ChartContainer>
        <h2>No data available</h2>
      </ChartContainer>
    );
  }

  // Group data by feature and program name
  const dataByFeature = arrAicomEreignisse.reduce((acc, entry) => {
    const key = `${entry.ProgramName}_${entry.Feature}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      x: new Date(parseInt(entry.StartTime)),
      y: entry.Stability || 0,
      dbComment: entry.Comment || '',
    });
    return acc;
  }, {});

  // Create datasets for each feature
  const datasets = Object.entries(dataByFeature).map(([key, data]) => ({
    label: key,
    data,
    borderColor: getRandomColor(), // Use a function to generate different colors
    fill: false,
  }));

  // Show only the dataset corresponding to the last key
  const lastKey = Object.keys(dataByFeature).pop();
  const lastDataset = datasets.find((dataset) => dataset.label === lastKey);
  const chartData = {
    datasets: [lastDataset], // Only include the dataset for the last key
  };

  /*Option
  // Show all datasets
  const chartData = {
    datasets,
  }; */

  // Chart options
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
            const x = moment(context.parsed.x).format('YYYY-MM-DD HH:mm:ss');
            const y = context.parsed.y;
            const dbComment = context.dataset.data[context.dataIndex].dbComment;

            // Tooltip content
            return `Startzeit: ${x}; Stabilität: ${y}; Kommentar: ${dbComment}`;
          },
        },
      },
    },
  };

  // Render the chart component
  return (
    <ChartContainer>
      <h2>Stabilität</h2>
      <Line data={chartData} options={options} />
    </ChartContainer>
  );
};

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Export the LineChart component
export default LineChart;
