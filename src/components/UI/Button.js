import React from 'react';
import styled from 'styled-components';

// Button should only provide the button and nothing else

const ButtonCSS = styled.button`
  background: #ffe100;
  color: black;
  font-size: 2em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

export default function Button({ children, onClick }) {
  return <ButtonCSS onClick={onClick}>{children}</ButtonCSS>;
}
