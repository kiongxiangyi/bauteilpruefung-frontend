import React from 'react';
import styled from 'styled-components';

const LightContainer = styled.div`
  margin: 0.5rem 0;
`;

const Light = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 5px;
  border: 4px solid black; /* Add this line to set the black border */
`;

export const TrafficLightProzessStability = ({ value }) => {
  let lightColor;

  if (value > 0.6) {
    lightColor = '#00FF00';
  } else if (value >= 0.3 && value <= 0.6) {
    lightColor = 'yellow';
  } else if (value > 0 && value <= 0.3) {
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

export const TrafficLightPronoseQuality = ({ value }) => {
  let lightColor;

  if (value > 0) {
    lightColor = '#00FF00';
  } else if (value >= -0.8 && value < 0) {
    lightColor = 'yellow';
  } else if (value < -0.8) {
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
