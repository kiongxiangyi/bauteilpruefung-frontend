import React, { useState, useEffect } from 'react';
import LineChart2 from '../../components/UI/LineChart2';
import useSSE from './useSSE';
import { memo } from 'react';
import calculateDownsampleFactors from '../../utils/calculateDownsampleFactors ';

const AbnormalSignalGraph = memo(function AbnormalSignalGraph() {
  const [abnormalSignals, setAbnormalSignals] = useState(null);

  const fetchAbnormalSignal = async () => {
    try {
      // Fetch CSV data from the server
      const response = await fetch(
        `${process.env.REACT_APP_API}/readFile/config/csvdata`
      );
      const data = await response.json();

      const lines = data.csvContent.trim().split('\n');
      //const headers = lines[0].split(';');
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

      //console.log('datasets:', datasets);
      // Log downsampling factors
      //console.log('Downsampling Factors:', downsampledData.downsamplingFactors);

      // Log the actual number of target points for each unique serial number
      /* console.log(
        'Actual Target Points per Serial:',
        downsampledData.actualTargetPointsPerSerial
      ); */

      setAbnormalSignals({
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

  /* 
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

   // Effect hook to fetch AicomEreignisse data on component mount and SSE updates
  useEffect(() => {
    fetchAbnormalSignal();
  }, [sseData]);
  */

  // Effect hook to fetch AicomEreignisse data on component mount and SSE updates
  useEffect(() => {
    fetchAbnormalSignal();
  }, []);

  return <LineChart2 chartData={abnormalSignals}></LineChart2>;
});
export default AbnormalSignalGraph;
