/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../../components/UI/Button';
import SynopBatchFileRunner from '../../components/SynopBatchFileRunner';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

export default function Menu({ setFetchDataTrigger }) {
  const navigate = useNavigate(); //hook for navigation
  const [showSerialnumberMsg, setShowSerialnumberMsg] = useState(false); //useState to control the trigger of the toast

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
    <>
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
    </>
  );
}
