/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../../components/UI/Button';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

export default function Menu() {
  const navigate = useNavigate(); //hook for navigation
  const [showSerialnumberMsg, setShowSerialnumberMsg] = useState(false); //useState to control the trigger of the toast

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
        <Button size="big" onClick={() => navigate('/synop-monitoring')}>
          Synop-Überwachungs-Tool
        </Button>
      </ButtonWrapper>
    </>
  );
}
