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
  gap: 1rem;
  padding: 3rem;
  margin: 5rem;
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
        .then((data) => {
          toast((t) => (
            <ToastContent>
              Serialnummer {data.Serialnummer} wurde erstellt.
              <ButtonWrapper>
                <Button
                  size="small"
                  onClick={() => {
                    toast.dismiss(t.id);
                  }}
                >
                  Schließen
                </Button>
              </ButtonWrapper>
            </ToastContent>
          ));
        })
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
