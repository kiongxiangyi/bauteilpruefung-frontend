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

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function Menu() {
  const navigate = useNavigate(); //hook for navigation
  const [showSerialnumberMsg, setShowSerialnumberMsg] = useState(false); //useState to control the trigger of the toast

  const createNewSerialnumber = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API}/Serialnummern/createNewRecord`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({}),
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const promptSerialnummer = () => {
    toast(
      (t) => (
        <ToastContent>
          <b>Wollen Sie eine Serialnummer anfordern?</b>
          <Button
            onClick={() => {
              createNewSerialnumber();
              toast.dismiss(t.id);
              setShowSerialnumberMsg(false);
            }}
          >
            Ja
          </Button>
          <Button
            onClick={() => {
              toast.dismiss(t.id);
              setShowSerialnumberMsg(false);
            }}
          >
            Nein
          </Button>
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

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            border: '1px solid',
            fontSize: '30px',
            maxWidth: 2000,
            top: 100,
          },
        }}
      />
      <ButtonWrapper>
        <Button size="big" onClick={() => navigate('/homepage')}>
          Bauteilprüfung
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button size="big" onClick={() => setShowSerialnumberMsg(true)}>
          Serialnummer anfordern
        </Button>
      </ButtonWrapper>
    </>
  );
}
