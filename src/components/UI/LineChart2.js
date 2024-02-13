// App.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

// Define a styled div for the chart container
const ChartContainer = styled.div`
  margin: 20px 20px;
`;

function LineChart2({ chartData }) {
  // Render the component
  return (
    <ChartContainer>
      {chartData && (
        <div>
          {/* Chart title */}
          <h2>Signalverläufe der Auffälligkeit</h2>
          {/* Line chart component */}
          <Line
            data={{
              datasets: chartData.datasets.map((dataset) => ({
                ...dataset,
                data: dataset.data.flatMap((point) => [
                  { x: point.xMin, y: point.yMin },
                  { x: point.xMax, y: point.yMax },
                ]),
              })),
            }}
            options={{
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                    //maxTicksLimit: 100, // Adjust the number of ticks as needed
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
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 20, // Set the font size for the legend labels
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    </ChartContainer>
  );
}

export default LineChart2;
