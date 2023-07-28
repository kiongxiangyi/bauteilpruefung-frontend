import React from 'react';
import styled from 'styled-components';

// Button should only provide the button and nothing else

const ButtonCSS = styled.button`
  background-color: #e7e7e7;
  color: black;
  margin: .5rem .5rem;
  font-size: 2rem;
  //box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border: 2px solid;
  padding: .5rem .5rem;
  border-radius: 5px;
`;

export default function Button({ children, onClick }) {
  return <ButtonCSS onClick={onClick}>{children}</ButtonCSS>;
}
