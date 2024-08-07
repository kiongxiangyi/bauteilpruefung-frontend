import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../../components/UI/Button';
import SynopBatchFileRunner from '../SynopMonitoring/SynopBatchFileRunner';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const Div = styled.div`
  margin-top: 5rem;
`;

export default function Menu({ setFetchDataTrigger }) {
  const navigate = useNavigate(); //hook for navigation
  const [showSerialnumberMsg, setShowSerialnumberMsg] = useState(false); //useState to control the trigger of the toast

  // Handle click on Synop-Überwachungs-Tool button
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

      // Navigate to the Synop-Monitoring page
      navigate('/synop-monitoring');
    } catch (error) {
      // Display error toast if an exception occurs during execution
      toast.error(
        'Bei der Ausführung des Synop-Überwachungs-Tools ist ein Fehler aufgetreten'
      );
    }
  };

  /*  const promptSerialnummer = () => {
    toast(
      (t) => (
        <ToastContent>
          <b>Wollen Sie eine Serialnummer anfordern?</b>

          <ButtonWrapper>
            <Button
              size="small"
              onClick={() => {
                createNewSerialnumber();
                toast.dismiss(t.id);
                setShowSerialnumberMsg(false);
              }}
            >
              Ja
            </Button>
            <Button
              size="small"
              onClick={() => {
                toast.dismiss(t.id);
                setShowSerialnumberMsg(false);
              }}
            >
              Nein
            </Button>
          </ButtonWrapper>
        </ToastContent>
      ),
      {
        duration: Infinity, //duration of toast appearance forever
      }
    );
  }; 

  if (showSerialnumberMsg) {
    promptSerialnummer();
  }
*/
  return (
    <Div>
      <ButtonWrapper>
        <Button size="big" onClick={() => navigate('/bauteilpruefung')}>
          Bauteilprüfung
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button size="big" onClick={() => navigate('/serialnummer')}>
          Serialnummer anfordern
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button size="big" onClick={handleSynopMonitoringClick}>
          Synop-Überwachungs-Tool
        </Button>
      </ButtonWrapper>
    </Div>
  );
}
