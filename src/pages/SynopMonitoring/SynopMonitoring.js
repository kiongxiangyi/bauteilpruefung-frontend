import React, { useState } from 'react';
import TrafficLight from '../../components/UI/TrafficLight';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SynopBatchFileRunner from './SynopBatchFileRunner';
import {
  Container,
  LeftSubContainer,
  TrafficLightContainer,
} from './StyledComponents';
import CommentComponent from './CommentComponent';
import StabilityGraph from './StabilityGraph';
import AbnormalSignalGraph from './AbnormalSignalGraph';
import InfoComponent from './InfoComponent';

// Register CategoryScale for use in Chart.js
Chart.register(CategoryScale);

const SynopMonitoring = () => {
  const navigate = useNavigate();
  // Function to handle the click on Synop Monitoring button
  const handleSynopMonitoringClick = async () => {
    try {
      const responseStopSynopProgram = await fetch(
        `${process.env.REACT_APP_API}/SynopProgram/stopSynopProgram`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!responseStopSynopProgram.ok) {
        throw new Error(
          `Failed to stop Synop program: ${responseStopSynopProgram.statusText}`
        );
      }

      const data = await responseStopSynopProgram.text();
      console.log(data); // Log response from the server

      // Execute SynopBatchFileRunner and wait for it to complete
      await SynopBatchFileRunner();

      // Display success toast
      toast.success('Aktualisiert!');

      // Navigate to the Synop-Monitoring page
      navigate('/synop-monitoring');
    } catch (error) {
      // Display error toast if an exception occurs during execution
      toast.error(
        'Bei der Ausführung des Synop-Überwachungs-Tools ist ein Fehler aufgetreten'
      );
    } finally {
      // Ensure the button is deactivated after SynopMonitoringClick
      setIsKommentarButtonActive(false);
    }
  };

  const [commentID, setCommentID] = useState('');
  const [totalPointsOnGraph, setTotalPointsOnGraph] = useState('');
  const [lastValueTrafficLight, setLastValueTrafficLight] = useState(null);
  const [commentFromSynop, setCommentFromSynop] = useState('');
  const [feature, setFeature] = useState('');
  const [tool, setTool] = useState('');
  const [isKommentarButtonActive, setIsKommentarButtonActive] = useState(false);

  // Callback function to set the state in SynopMonitoring.js
  const onKommentarButtonActivation = (isActive) => {
    setIsKommentarButtonActive(isActive);
  };

  return (
    <>
      <Container>
        <LeftSubContainer>
          {/* Button to trigger Synop Monitoring */}
          {/*   <Button size="small" onClick={handleSynopMonitoringClick}>
            Aktualisieren
          </Button> */}
          <TrafficLightContainer>
            <TrafficLight value={lastValueTrafficLight}></TrafficLight>
            <InfoComponent
              tool={tool}
              commentFromSynop={commentFromSynop}
              feature={feature}
            />
          </TrafficLightContainer>
          <CommentComponent
            isKommentarButtonActive={isKommentarButtonActive}
            setIsKommentarButtonActive={setIsKommentarButtonActive}
            totalPointsOnGraph={totalPointsOnGraph}
            commentID={commentID}
          />
        </LeftSubContainer>
        <StabilityGraph
          setCommentID={setCommentID}
          setTotalPointsOnGraph={setTotalPointsOnGraph}
          setLastValueTrafficLight={setLastValueTrafficLight}
          setCommentFromSynop={setCommentFromSynop}
          setFeature={setFeature}
          setTool={setTool}
          onKommentarButtonActivation={onKommentarButtonActivation}
        />
      </Container>
      
      <AbnormalSignalGraph />
    </>
  );
};

export default SynopMonitoring;
