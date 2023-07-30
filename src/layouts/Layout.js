import React from 'react';
import Header from '../components/Header';

import styled from 'styled-components';

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
`;

// The Layout component take cares of the core layout of our application
// The layout component can have Header, Footer, Side Navigation etc
export default function Layout({ children, color }) {
  return (
    <>
      <Header color={color} />
      <main>{children}</main>
      <LogoDiv>
        <img
          src="./pictures/copiedLogo.jpg"
          alt="logo"
          height="400px"
          width="320px"
        ></img>
      </LogoDiv>
    </>
  );
}
