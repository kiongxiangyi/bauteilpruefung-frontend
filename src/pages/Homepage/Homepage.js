/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SelectMenu from '../../components/UI/SelectMenu';
import TextInput from '../../components/UI/TextInput';
import Button from '../../components/UI/Button';
import { NumberInputSmall } from '../../components/UI/NumberInput';

const H2 = styled.h2`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 0 0;
  padding: 0 1rem;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 0 0;
`;

const StyleOptionLabel = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    flex: 1;
  }
`;

export default function Homepage({
  setPruefplannummer,
  pruefplannummer,
  handleSearch,
  selectedPruefplannummer,
  setSelectedPruefplannummer,
  bauteilnummer,
  setBauteilnummer,
  logoPath,
}) {
  //lift the state up from children SelectMenu
  const handleSelectionChange = (pruefplannummer) => {
    setSelectedPruefplannummer(pruefplannummer);
  };

  const optionPruefplan = []; //array for selected option
  //match Prüfplannummer of DB
  const arrPruefplan = pruefplannummer.map(
    (tblAuftragPruefplan) => tblAuftragPruefplan.Pruefplannummer
  );

  //match Prüfplan of DB
  const arrPruefplan2 = pruefplannummer.map(
    (tblAuftragPruefplan) => tblAuftragPruefplan.Pruefplan
  );

  for (let i = 0; i < arrPruefplan.length; i++) {
    optionPruefplan.push({
      pruefplannummer: arrPruefplan[i], //value is Prüfplannummer
      pruefplan: arrPruefplan2[i],
    });
  }

  //for custom option
  const formatOptionLabel = ({ pruefplannummer, pruefplan }) => (
    <StyleOptionLabel>
      <div>{pruefplannummer}</div>
      <div>{pruefplan}</div>
    </StyleOptionLabel>
  );

  useEffect(() => {
    // let interval; // interval tutorial - https://www.codingdeft.com/posts/react-useeffect-hook/
    const fetchPruefplan = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AuftragPruefplan`
        );
        const results = await response.json();
        setPruefplannummer(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPruefplan();

    const interval = setInterval(() => {
      fetchPruefplan();
    }, 1 * 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <H2>Bitte Prüfplannummer auswählen:</H2>
      <Div>
        <SelectMenu
          onChange={(option) => handleSelectionChange(option.pruefplannummer)}
          options={optionPruefplan}
          formatOptionLabel={formatOptionLabel}
          getOptionValue={(option) => option.pruefplannummer} //only selected are blue colour shown, if not all are blue
        />
      </Div>
      {/* The TextInput should only provide input box and nothing else, otherwise it would become less reusable */}
      <H2>Bauteilnummer:</H2>
      <Div>
        <NumberInputSmall
          autoFocus
          name="bauteilnummer"
          value={bauteilnummer}
          onChange={(e) => setBauteilnummer(e.target.value)}
        />
      </Div>
      {/* Centering the button should be responsibility of the parent component */}
      {/* Button should only provide the button and nothing else */}
      <Div>
        <Button onClick={handleSearch}>Suchen</Button>
      </Div>
      <Div>
        <img
          src="./pictures/Aicom_logo.jpg"
          alt="logo"
          height="400px"
          width="320px"
        ></img>
      </Div>
    </div>
  );
}
