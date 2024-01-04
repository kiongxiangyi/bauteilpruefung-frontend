import React, { useState, useEffect } from 'react';
import TrafficLight from '../../components/UI/TrafficLight';
import LineChart from '../../components/UI/LineChart';
import LineChart2 from '../../components/UI/LineChart2';
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 1rem;
`;

const SynopMonitoring = ({
  setFetchDataTrigger,
  chartData,
  arrAicomEreignisse,
  lastValueTrafficLight,
}) => {
  const navigate = useNavigate();

  // Handle click on Synop-Überwachungs-Tool button
  const handleSynopMonitoringClick = async () => {
    // Start loading toast
    const loadingToast = toast.loading(
      'Bitte warten Sie auf die Ausführung des Synop-Überwachungs-Tools...'
    );

    try {
      // Execute SynopBatchFileRunner and wait for it to complete
      await SynopBatchFileRunner();
      // Set fetch data trigger to true to initiate CSV data fetching
      setFetchDataTrigger(true);
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

  return (
    <div>
      <Container>
        <ButtonWrapper>
          <Button size="small" onClick={handleSynopMonitoringClick}>
            Aktualisieren
          </Button>
          <TrafficLight value={lastValueTrafficLight}></TrafficLight>
        </ButtonWrapper>
        <LineChart arrAicomEreignisse={arrAicomEreignisse} />
      </Container>
      <LineChart2 chartData={chartData}></LineChart2>
    </div>
  );
};

export default SynopMonitoring;
