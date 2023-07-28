/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import styled from 'styled-components';

import Button from '../../components/UI/Button';

export default function Menu() {
  const navigate = useNavigate(); //hook for navigation

  return (
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid',
            fontSize: '30px',
            maxWidth: 1000,
          },
        }}
      />
      <Button onClick={() => navigate('/homepage')}>Bauteilprüfung</Button>
      <Button onClick={() => toast.success('Serialnummer XXX ist vergeben.')}>
        Serialnummer anfordern
      </Button>
    </>
  );
}
