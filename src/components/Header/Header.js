import React from 'react';
import styled from 'styled-components';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const HeaderText = styled.h1`
  font-size: 36px;
  padding: 5px 5px;
`;

export default function Header() {
  const navigate = useNavigate(); //hook for navigation

  return (
    <header className="header">
      <HeaderText>Bauteilprüfung</HeaderText>
      <button className="homeButton" onClick={() => navigate('/')}>
        <img src="./pictures/home-btn.png" alt="home"></img>
      </button>
    </header>
  );
}
