import React, { useRef, useEffect, useState } from 'react';
import { Line, getElementAtEvent } from 'react-chartjs-2';
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
  const chartRef = useRef();
  const onClick = (event) => {
    const result = getElementAtEvent(chartRef.current, event);
    if (result.length > 0) {
      console.log(result[0].index);
    }
  };

  // Check if there is no data
  if (!arrAicomEreignisse || arrAicomEreignisse.length === 0) {
    // Render a message when there is no data
    return (
      <ChartContainer>
        <h2>No data available</h2>
      </ChartContainer>
    );
  }

  /*   // Find the last data entry based on ProgramName and Feature
  const lastKey = arrAicomEreignisse.reduce((lastKey, entry) => {
    // Create a key based on ProgramName and Feature
    const key = `${entry.ProgramName}_${entry.Feature}`;
    console.log(key);
    // Check if the current entry has a later FormattedStartTime than the previous lastKey
    if (
      !lastKey ||
      entry.FormattedStartTime > lastKey.entry.FormattedStartTime
    ) {
      // If so, update lastKey to the current entry
      return { key, entry };
    }

    // If not, keep the current lastKey
    return lastKey;
  }, null); */

  // Find the last data entry based on ProgramName and Feature
  const lastKey = arrAicomEreignisse.reduce((lastKey, entry) => {
    // Create a key based on ProgramName and Feature
    const key = `${entry.ProgramName}_${entry.Feature}`;

    // Always update lastKey to the current entry
    return { key, entry };
  }, null);

  // Get the last 20 entries based on the last data found
  const last20Entries = arrAicomEreignisse
    // Filter entries that match the key of the last data found
    .filter((entry) => `${entry.ProgramName}_${entry.Feature}` === lastKey.key)
    // Get the last 20 entries
    .slice(-20)
    // Convert entries to the desired format
    .map((entry) => ({
      x: new Date(entry.FormattedStartTime),
      y: entry.Stability || 0,
      dbComment: entry.Comment || '',
    }));

  // Create dataset for the last key
  const dataset = {
    label: lastKey.key,
    data: last20Entries,
    borderColor: getRandomColor(), // Use a function to generate different colors
    fill: false,
  };

  // Show only the dataset corresponding to the last key (show only one line)
  const chartData = {
    datasets: [dataset], // Only include the dataset for the last key
  };

  /*Option
  // Show all datasets (show all line)
  const chartData = {
    datasets,
  }; */

  // Calculate the time difference between the first and last data points
  const timeDifference = moment(last20Entries[last20Entries.length - 1].x).diff(
    moment(last20Entries[0].x)
  );

  // Determine the appropriate time unit based on the time difference
  const dynamicTimeUnit = calculateTimeUnit(timeDifference);

  // Chart options
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: dynamicTimeUnit,
          displayFormats: {
            second: 'YYYY-MM-DD HH:mm:ss',
            minute: 'YYYY-MM-DD HH:mm',
            hour: 'YYYY-MM-DD HH:mm',
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
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Render the chart component
  return (
    <ChartContainer>
      <h2>Stabilität</h2>
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
        onClick={onClick}
      />
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

// Function to calculate the appropriate time unit based on the time difference
const calculateTimeUnit = (timeDifference) => {
  const seconds = moment.duration(timeDifference).asSeconds();
  if (seconds < 60) {
    //60s
    return 'second';
  } else if (seconds < 3600) {
    //60mins
    return 'minute';
  } else {
    return 'hour';
  }
};

// Export the LineChart component
export default LineChart;
