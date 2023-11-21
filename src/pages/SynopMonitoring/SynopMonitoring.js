import React, { useState, useEffect } from 'react';
import TrafficLight from '../../components/UI/TrafficLight';
import LineChart from '../../components/UI/LineChart';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import styled from 'styled-components';

Chart.register(CategoryScale);

const Container = styled.div`
  display: flex;
`;

const SynopMonitoring = () => {
  const [arrAicomEreignisse, setArrAicomEreignisse] = useState([]);
  console.log(arrAicomEreignisse);
  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data (can be an API call, etc.)
    const fetchtblAicomEreignisse = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AicomEreignisse`
        );
        const result = await response.json();
        setArrAicomEreignisse(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchtblAicomEreignisse();

    // Cleanup function (optional) - will be called when the component unmounts
    return () => {
      // Perform cleanup, if necessary
      // For example, cancel network requests or clear subscriptions
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <Container>
      <TrafficLight value={0.8}></TrafficLight>
      <LineChart arrAicomEreignisse={arrAicomEreignisse} />
    </Container>
  );
};

export default SynopMonitoring;
