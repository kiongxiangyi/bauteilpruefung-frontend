/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SelectMenu from '../../components/UI/SelectMenu';
import Button from '../../components/UI/Button';

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

//for custom option
const formatOptionLabel = ({ pruefplannummer, pruefplan }) => (
  <StyleOptionLabel>
    <div>{pruefplannummer}</div>
    <div>{pruefplan}</div>
  </StyleOptionLabel>
);

export default function Bauteilpruefung({
  handleSearch,
  selectedPruefplannummer,
  setSelectedPruefplannummer,
  setBauteilnummer,
}) {
  const [pruefplannummer, setPruefplannummer] = useState([]);
  const [serialnummern, setSerialnummern] = useState([]);
  const optionPruefplan = []; //array for selected option

  //lift the state up from children SelectMenu
  const handleSelectionChange = (pruefplannummer) => {
    setSelectedPruefplannummer(pruefplannummer);

    //find serial number according to selected option
    const fetchSerialnumber = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/Serialnummern/${pruefplannummer}`
        );
        const results = await response.json();
        setSerialnummern(results);
        console.log(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSerialnumber();
  };

  const handleSelectionSerialNumberChange = (serialnummer) => {
    setBauteilnummer(serialnummer);
  };

  const optionSerialnummern = [];
  const arrSerialnummern = serialnummern.map(
    (tblSerialnummern) => tblSerialnummern.Serialnummer
  );

  for (let i = 0; i < arrSerialnummern.length; i++) {
    optionSerialnummern.push({
      value: arrSerialnummern[i],
      label: arrSerialnummern[i],
    });
  }

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

  useEffect(() => {
    // let interval; // interval tutorial - https://www.codingdeft.com/posts/react-useeffect-hook/
    const fetchPruefplan = async () => {
      try {
        setSelectedPruefplannummer('');
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

    /*    const interval = setInterval(() => {
      fetchPruefplan();
    }, 1 * 5000);

    return () => {
      clearInterval(interval);
    }; */
  }, []);

  return (
    <Wrapper>
      <H2>Bitte eine Prüfplannummer auswählen:</H2>

      <SelectMenu
        onChange={(option) => handleSelectionChange(option.pruefplannummer)}
        options={optionPruefplan}
        formatOptionLabel={formatOptionLabel}
        getOptionValue={(option) => option.pruefplannummer} //only selected are blue colour shown, if not all are blue
      />

      {/* The TextInput should only provide input box and nothing else, otherwise it would become less reusable */}
      <H2>Bitte eine Serialnummer auswählen:</H2>

      <SelectMenu
        onChange={(option) => handleSelectionSerialNumberChange(option.value)}
        options={optionSerialnummern}
        getOptionValue={(option) => option.value}
      />

      {/* Centering the button should be responsibility of the parent component */}
      {/* Button should only provide the button and nothing else */}

      <Button size="small" onClick={handleSearch}>
        Anlegen
      </Button>
    </Wrapper>
  );
}
