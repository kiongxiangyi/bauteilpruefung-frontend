/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function SelectMenu({ optionPruefplan }) {
  const [isSearchable, setIsSearchable] = useState(true);
  const [selection, setSelection] = useState('');

  return (
    <Div>
      <Select
        isSearchable={isSearchable}
        onChange={(choice) => setSelection(choice.value)}
        options={optionPruefplan}
      />
    </Div>
  );
}
