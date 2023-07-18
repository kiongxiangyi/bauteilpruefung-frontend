/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

import SelectMenu from '../../components/UI/SelectMenu';
import TextInput from '../../components/UI/TextInput';
import Button from '../../components/UI/Button';

const P = styled.p`
  font-size: 2rem;
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

const StyleOptionLabel = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    flex: 1;
  }
`;

export default function Homepage({
  pruefplannummer,
  handleSearch,
  setSelectedPruefplannummer,
}) {
  const [bauteilnummer, setBauteilnummer] = useState('');

  //lift the state up from children SelectMenu
  const handleSelectionChange = (value) => {
    setSelectedPruefplannummer(value);
  };

  const optionPruefplan = [];
  const arrPruefplan = pruefplannummer.map(
    (pruefplan) => pruefplan.Pruefplannummer
  );

  const arrPruefplan2 = pruefplannummer.map((pruefplan) => pruefplan.Pruefplan);

  for (let i = 0; i < arrPruefplan.length; i++) {
    optionPruefplan.push({
      value: arrPruefplan[i],
      label: arrPruefplan[i],
      pruefplan: arrPruefplan2[i],
    });
  }

  //for custom option
  const formatOptionLabel = ({ value, label, pruefplan }) => (
    <StyleOptionLabel>
      <div>{label}</div>
      <div>{pruefplan}</div>
    </StyleOptionLabel>
  );

  return (
    <div>
      <Div>
        <SelectMenu
          onChange={(choice) => handleSelectionChange(choice.value)}
          options={optionPruefplan}
          formatOptionLabel={formatOptionLabel}
        />
      </Div>
      {/* The TextInput should only provide input box and nothing else, otherwise it would become less reusable */}
      <Div>
        <P>Bauteilnummer:</P>
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
