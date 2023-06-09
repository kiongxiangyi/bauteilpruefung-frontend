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

export default function Homepage() {
  const [bauteilnummer, setBauteilnummer] = useState('');
  /* const handleClick = () => {
    console.log("Button was clicked!");
  }; */
  const navigate = useNavigate(); //hook for navigation

  
  function handleSearch() {
    console.log({ bauteilnummer });
    // Perform the logic of calling the API with appropriate data
    // If results is successful then navigate to /results route
    navigate('/results');
  }

  return (
    <div>
      <Div>
        <SelectMenu />
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
