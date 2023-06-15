/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SelectMenu from '../../components/UI/SelectMenu';
import TextInput from '../../components/UI/TextInput';
import Button from '../../components/UI/Button';

const H1 = styled.h1`
  height: 50px;
  font-size: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0 0 0;
`;

export default function Homepage({ pruefplannummer }) {
  const [bauteilnummer, setBauteilnummer] = useState('');
  const [auftragPruefpositionen, setAuftragPruefpositionen] = useState([]);
  /* const handleClick = () => {
    console.log("Button was clicked!");
  }; */
  const navigate = useNavigate(); //hook for navigation

  function handleSearch() {
    console.log({ bauteilnummer });
    // Perform the logic of calling the API with appropriate data
    const fetchAuftragPruefpositionen = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/AuftragPruefpositionen/pruefplannummer=${}`
        );
        const results = await response.json();
        setAuftragPruefpositionen(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuftragPruefpositionen();

    console.log(auftragPruefpositionen);
    // If results is successful then navigate to /results route
    navigate('/results');
  }

  const optionPruefplan = [];
  const arrPruefplan = pruefplannummer.map(
    (pruefplan) => pruefplan.Pruefplannummer
  );

  for (let i = 0; i < arrPruefplan.length; i++) {
    optionPruefplan.push({
      value: arrPruefplan[i],
      label: arrPruefplan[i],
    });
  }

  return (
    <div>
      <Div>
        <SelectMenu optionPruefplan={optionPruefplan} />
      </Div>
      {/* The TextInput should only provide input box and nothing else, otherwise it would become less reusable */}
      <Div>
        <H1>Bauteilnummer:</H1>
        <TextInput
          autoFocus
          name="bauteilnummer"
          pattern="[0-9]+"
          value={bauteilnummer}
          onChange={(e) => setBauteilnummer(e.target.value)}
        />
      </Div>
      {/* Centering the button should be responsibility of the parent component */}
      {/* Button should only provide the button and nothing else */}
      <Div>
        <Button onClick={handleSearch}>Search</Button>
      </Div>
    </div>
  );
}
