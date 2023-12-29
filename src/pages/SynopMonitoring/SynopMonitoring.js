import React, { useState, useEffect } from 'react';
import TrafficLight from '../../components/UI/TrafficLight';
import LineChart from '../../components/UI/LineChart';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SynopBatchFileRunner from '../../components/SynopBatchFileRunner';
import Button from '../../components/UI/Button';

Chart.register(CategoryScale);

const Container = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex; /* Add display flex */
  flex-direction: column;
  align-items: center; /* Center align items vertically */
  margin: 3rem 1rem;
`;

const SynopMonitoring = () => {
  const navigate = useNavigate(); //hook for navigation
  // Handle click on Synop-Überwachungs-Tool button
  const handleSynopMonitoringClick = async () => {
    // Start loading toast
    const loadingToast = toast.loading(
      'Bitte warten Sie auf die Ausführung des Synop-Überwachungs-Tools...'
    );

    try {
      // Execute SynopBatchFileRunner and wait for it to complete
      await SynopBatchFileRunner();

      // Display success toast
      toast.success('Synop-Überwachungs-Tool wurde erfolgreich ausgeführt');

      // Navigate to the Synop-Monitoring page
      navigate('/synop-monitoring');
    } catch (error) {
      // Display error toast if an exception occurs during execution
      toast.error(
        'Bei der Ausführung des Synop-Überwachungs-Tools ist ein Fehler aufgetreten'
      );
    } finally {
      // Dismiss the loading toast regardless of success or failure
      toast.dismiss(loadingToast);
    }
  };

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
    <div>
      <Container>
        <ButtonWrapper>
          <Button size="small" onClick={handleSynopMonitoringClick}>
            Aktualisieren
          </Button>
          <TrafficLight value={0.8}></TrafficLight>
        </ButtonWrapper>
        <LineChart arrAicomEreignisse={arrAicomEreignisse} />
      </Container>
    </div>
  );
};

export default SynopMonitoring;
