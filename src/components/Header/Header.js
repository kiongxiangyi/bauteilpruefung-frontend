import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderText = styled.h1`
  font-size: 36px;
  padding: 8px 8px;
`;

const Button = styled.button`
  all: unset; /* remove background of img */
  cursor: pointer;
  margin-left: auto;
  padding: 5px 5px;
  &:hover {
    opacity: 0.5;
  }
`;

const HeaderComponent = styled.header`
  background-color: ${({ red, green, blue }) =>
    `rgb(${red}, ${green}, ${blue})`};
  display: flex;
  position: relative;
  border-radius: 5px;
`;

export default function Header({ color }) {
  const navigate = useNavigate(); //hook for navigation

  return (
    <HeaderComponent
      red={color.HeaderRot}
      green={color.HeaderGruen}
      blue={color.HeaderBlau}
    >
      <HeaderText>GTMS meets AICoM</HeaderText>
      <Button onClick={() => navigate('/menu')}>
        <img src="./pictures/home-btn.png" alt="home"></img>
      </Button>
    </HeaderComponent>
  );
}
