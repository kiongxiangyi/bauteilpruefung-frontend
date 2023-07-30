/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/UI/Button';
import TableAuftragPruefpositionen from '../../components/Table/TableAuftragPruefpositionen';
import { TableDiv } from '../../components/UI/Table';

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

const DivImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Image = styled.img``;

export default function Results({
  auftragPruefpositionen,
  handleSubmit,
  setResult,
  result,
  handleInputChange,
  handleClickPreviousPage,
}) {
  const [showImage, setShowImage] = useState(false);
  const handleClickOpenImage = () => {
    if (showImage) {
      setShowImage(false);
    } else {
      setShowImage(true);
    }
  };

  return (
    <>
      <ButtonDiv>
        <Button onClick={handleClickOpenImage}>Zeichnung anzeigen</Button>
      </ButtonDiv>
      {showImage && (
        <DivImage>
          <Image
            src="./pictures/copiedImage.jpg"
            alt="copiedImage"
            width="20%"
            height="20%"
          />
        </DivImage>
      )}
      <TableDiv>
        <TableAuftragPruefpositionen
          auftragPruefpositionen={auftragPruefpositionen}
          setResult={setResult}
          result={result}
          handleInputChange={handleInputChange}
        />
      </TableDiv>
      <ButtonDiv>
        <Button onClick={handleClickPreviousPage}>Zurück</Button>
        <Button onClick={handleSubmit}>Speichern</Button>
      </ButtonDiv>
    </>
  );
}
