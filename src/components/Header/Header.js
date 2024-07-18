import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Button from '../UI/Button';

const HeaderText = styled.h1`
  font-size: 36px;
  padding: 8px 8px;
  flex-grow: 1; /* Allow the header text to grow */
`;

const HomeButton = styled.button`
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
  position: fixed; /* Make the header fixed */
  top: 0; /* Stick to the top of the page */
  left: 0; /* Stick to the left of the page */
  width: 100%; /* Ensure the header takes up full width */
  border-radius: 5px;
  z-index: 1000; /* Ensure the header is above other content */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  height: 60px; /* Set the height of the header */
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 1rem;
`;

export default function Header({ color }) {
  const location = useLocation();
  const navigate = useNavigate(); //hook for navigation
  // Check the current pathname to determine which page you are on
  const currentPage = location.pathname;

  const headerText = (() => {
    switch (currentPage) {
      case '/synop-monitoring':
        return 'AICoM Feature-Prozess-Monitor';
      case '/another-page':
        return 'Another Page';
      // Add more cases as needed
      default:
        return 'AICoM';
    }
  })();

  // Example: Check if the user is on the '/synop-monitoring' page
  const isOnSynopMonitoringPage = currentPage === '/synop-monitoring';

  const handleClick = () => {
    if (isOnSynopMonitoringPage) {
      handleNavigate();
    } else {
      navigate('/');
    }
  };

  const handleNavigate = () => {
    // Funktion zur Steuerung der Navigation
    const navigateToHomePage = () => {
      navigate('/');
    };

    const stopSynopProgram = async () => {
      const responseStopSynopProgram = await fetch(
        `${process.env.REACT_APP_API}/SynopProgram/stopSynopProgram`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!responseStopSynopProgram.ok) {
        throw new Error(
          `Failed to stop Synop program: ${responseStopSynopProgram.statusText}`
        );
      }

      const data = await responseStopSynopProgram.text();
      console.log(data); // Log response from the server
    };

    // Funktion zur Anzeige des Toasts
    toast((t) => (
      <span>
        Soll die im Hintergrund laufende Prozessüberwachung ebenfalls beendet
        werden?
        <ButtonWrapper>
          <Button
            size="small"
            onClick={async () => {
              // Schließen Sie den Toast und navigieren Sie zur Homepage, wenn "Ja" geklickt wird
              toast.dismiss(t.id);
              navigateToHomePage();
              await stopSynopProgram();
            }}
          >
            Ja
          </Button>
          <Button
            size="small"
            onClick={() => {
              // Schließen Sie den Toast und navigieren Sie zur Homepage, wenn "Nein" geklickt wird
              toast.dismiss(t.id);
              navigateToHomePage();
            }}
          >
            Nein
          </Button>
        </ButtonWrapper>
      </span>
    ));
  };

  return (
    <HeaderComponent
      red={color.HeaderRot}
      green={color.HeaderGruen}
      blue={color.HeaderBlau}
    >
      <HeaderText>{headerText}</HeaderText>
      <HomeButton onClick={handleClick}>
        <img src="./pictures/home-btn.png" alt="home"></img>
      </HomeButton>
    </HeaderComponent>
  );
}
