import React from 'react';
import styled from 'styled-components';

const LightContainer = styled.div`
  margin-top: 3rem;
`;

const Light = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 5px;
  border: 4px solid black; /* Add this line to set the black border */
`;

const TrafficLight = ({ value }) => {
  let lightColor;

  if (value > 0.6) {
    lightColor = 'green';
  } else if (value >= 0.3 && value <= 0.6) {
    lightColor = 'yellow';
  } else if (value >= 0 && value <= 0.3) {
    lightColor = 'red';
  } else {
    lightColor = 'white';
  }

  return (
    <LightContainer>
      <Light style={{ background: lightColor }}></Light>
    </LightContainer>
  );
};

export default TrafficLight;
