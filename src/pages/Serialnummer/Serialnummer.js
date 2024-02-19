/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import SelectMenu from '../../components/UI/SelectMenu';
import Button from '../../components/UI/Button';
//import { Navigate } from '../../../node_modules/react-router-dom/dist/index';

const H2 = styled.h2`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 0 0;
  padding: 0 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
`;

const StyleOptionLabel = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    flex: 1;
  }
`;
/* 
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
`;*/

//for custom option
const formatOptionLabel = ({ bauteil, artikel }) => (
  <StyleOptionLabel>
    <div>{bauteil}</div>
    <div>{artikel}</div>
  </StyleOptionLabel>
);

export default function Serialnummer({
  createNewSerialnumber,
  setSelectedBauteil,
}) {
  const [bauteile, setBauteile] = useState([]);

  const navigate = useNavigate(); //hook for navigation
  const optionBauteile = []; //array for selected option

  //lift the state up from children SelectMenu
  const handleSelectionChange = (bauteil) => {
    setSelectedBauteil(bauteil);
  };

  //match Prüfplannummer of DB
  const arrBauteile = bauteile.map((tblBauteile) => tblBauteile.Bauteil);

  //match Prüfplan of DB
  const arrArtikelBauteile = bauteile.map((tblBauteile) => tblBauteile.Artikel);

  for (let i = 0; i < arrBauteile.length; i++) {
    optionBauteile.push({
      bauteil: arrBauteile[i], //value is Prüfplannummer
      artikel: arrArtikelBauteile[i],
    });
  }

  useEffect(() => {
    const fetchBauteile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/Bauteile`);
        const results = await response.json();
        setBauteile(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBauteile();
  }, []);

  return (
    <Wrapper>
      <H2>Bitte ein Bauteil auswählen:</H2>

      <SelectMenu
        onChange={(option) => handleSelectionChange(option.bauteil)}
        options={optionBauteile}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={(option) => option.bauteil} //only selected are blue colour shown, if not all are blue
      />

      <Button size="small" onClick={createNewSerialnumber}>
        Anlegen
      </Button>
    </Wrapper>
  );
}
