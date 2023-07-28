/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../../components/UI/Button';

const MenuButton = styled.button`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  color: black;
  font-size: 3rem;
  letter-spacing: 0.15rem;
  height: 10rem;
  width: 30rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const B = styled.b`
  display: block;
`;

export default function Menu({
  promptSerialnumberMsg,
  setPromptSerialnumberMsg,
}) {
  const navigate = useNavigate(); //hook for navigation

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
  console.log(promptSerialnumberMsg);

  const promptSerialnummer = () => {
    toast(
      (t) => (
        <>
          <B>Wollen Sie eine Serialnummer anfordern?</B>
          <Button
            onClick={() => {
              createNewSerialnumber();
              toast.dismiss(t.id);
              setPromptSerialnumberMsg(false);
            }}
          >
            Ja
          </Button>
          <Button
            onClick={() => {
              toast.dismiss(t.id);
              setPromptSerialnumberMsg(false);
            }}
          >
            Nein
          </Button>
        </>
      ),
      {
        duration: 60000, //toast appear for one second
      }
    );
  };

  if (promptSerialnumberMsg) {
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
      <Div>
        <MenuButton onClick={() => navigate('/homepage')}>
          Bauteilprüfung
        </MenuButton>
      </Div>
      <Div>
        <MenuButton onClick={() => setPromptSerialnumberMsg(true)}>
          Serialnummer anfordern
        </MenuButton>
      </Div>
    </>
  );
}
