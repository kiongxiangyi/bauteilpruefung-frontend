/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/UI/Button';
import TableAuftragPruefpositionen from '../../components/Table/TableAuftragPruefpositionen';
import { TableDiv } from '../../components/UI/Table';
import ImageModal from '../../components/Image/ImageModal';

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

export default function Results({
  auftragPruefpositionen,
  handleSubmit,
  setResult,
  result,
  handleInputChange,
  handleClickPreviousPage,
  color,
}) {
  const [showImageText, setShowImageText] = useState('Zeichnung öffnen');
  const [showImage, setShowImage] = useState(false);

  const handleClickOpenImage = () => {
    if (showImage) {
      setShowImage(false);
      setShowImageText('Zeichnung öffnen');
    } else {
      setShowImage(true);
      setShowImageText('Zeichnung schließen');
    }
  };

  return (
    <>
      <ButtonDiv>
        <Button size="medium" onClick={handleClickOpenImage}>
          {showImageText}
        </Button>
      </ButtonDiv>
      {showImage && <ImageModal imageUrl="./pictures/copiedImage.jpg" />}
      <TableDiv>
        <TableAuftragPruefpositionen
          auftragPruefpositionen={auftragPruefpositionen}
          setResult={setResult}
          result={result}
          handleInputChange={handleInputChange}
          color={color}
        />
      </TableDiv>
      <ButtonDiv>
        <Button size="small" onClick={handleClickPreviousPage}>
          Zurück
        </Button>
        <Button size="small" onClick={handleSubmit}>
          Speichern
        </Button>
      </ButtonDiv>
    </>
  );
}
