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

const P = styled.p`
  text-align: center; /* Added to center the text horizontally */
  margin: 0.5rem 0;
  line-height: 1.5;
  font-size: 20px;
`;

const Textarea = styled.textarea`
  margin: 0.5rem 0;
  font-size: 20px;
`;

const SynopMonitoring = ({
  setFetchDataTrigger,
  chartData,
  arrAicomEreignisse,
  lastValueTrafficLight,
  commentFromDB,
}) => {
  const navigate = useNavigate();

  // Handle click on Synop-Überwpm run devachungs-Tool button
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

  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleCommentClick = () => {
    setShowCommentBox(true);
  };

  const handleSaveComment = () => {
    // Save or use the comment data as needed
    toast.success(`Kommentar gespeichert!`, {
      duration: 3000,
    });

    // Optionally, you can reset the comment and hide the comment box after saving
    setComment('');
    setShowCommentBox(false);
  };

  return (
    <div>
      <Container>
        <ButtonWrapper>
          <Button size="small" onClick={handleSynopMonitoringClick}>
            Aktualisieren
          </Button>
          <TrafficLight value={lastValueTrafficLight}></TrafficLight>
          {commentFromDB && <P>{commentFromDB}</P>}
          {showCommentBox ? (
            <>
              <Textarea
                rows={4}
                cols={20}
                placeholder="Geben Sie Ihren Kommentar hier ein."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Textarea>
              <Button size="small" onClick={handleSaveComment}>
                Speichern
              </Button>
            </>
          ) : (
            <Button size="small" onClick={handleCommentClick}>
              Kommentar
            </Button>
          )}
        </ButtonWrapper>
        <LineChart arrAicomEreignisse={arrAicomEreignisse} />
      </Container>
      <LineChart2 chartData={chartData}></LineChart2>
    </div>
  );
};

export default SynopMonitoring;
