import React from 'react';
import styled from 'styled-components';

const LightContainer = styled.div`
  flex-direction: column;
  align-items: left;
  margin: 50px 100px;
`;

const Light = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 5px;
`;

const TrafficLight = ({ value }) => {
  let lightColor;

  if (value >= 0.7) {
    lightColor = 'green';
  } else if (value >= 0.5) {
    lightColor = 'yellow';
  } else {
    lightColor = 'red';
  }

  return (
    <LightContainer>
      <Light style={{ background: lightColor }}></Light>
    </LightContainer>
  );
};

export default TrafficLight;
