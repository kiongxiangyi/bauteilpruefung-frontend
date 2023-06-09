import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderText = styled.h1`
  font-size: 36px;
  padding: 5px 5px;
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

const HeaderCSS = styled.header`
  background-color: #ffe100;
  display: flex;
  position: relative;
  border-radius: 5px;
`;

export default function Header() {
  const navigate = useNavigate(); //hook for navigation

  return (
    <HeaderCSS>
      <HeaderText>Bauteilprüfung</HeaderText>
      <Button onClick={() => navigate('/')}>
        <img src="./pictures/home-btn.png" alt="home"></img>
      </Button>
    </HeaderCSS>
  );
}
