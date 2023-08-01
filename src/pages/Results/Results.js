/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem;
  margin: 5rem;
`;

export default function Results({
  auftragPruefpositionen,
  handleSubmit,
  setResult,
  result,
  handleInputChange,
  handleClickPreviousPage,
  color,
  picturePath,
}) {
  const [showImageText, setShowImageText] = useState('Zeichnung öffnen');
  const [showImage, setShowImage] = useState(false);

  const handleClickOpenImage = () => {
    if (picturePath === 'No path is found.') {
      toast((t) => (
        <ToastContent>
          Es gibt keine Zeichnung für die Prüfplannummer.
          <ButtonWrapper>
            <Button
              size="small"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Schließen
            </Button>
          </ButtonWrapper>
        </ToastContent>
      ));
    } else if (picturePath === 'No such file or directory.') {
      toast((t) => (
        <ToastContent>
          Der Pfad der Zeichnung ist nicht verfügbar.
          <ButtonWrapper>
            <Button
              size="small"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Schließen
            </Button>
          </ButtonWrapper>
        </ToastContent>
      ));
    } else if (showImage && picturePath === 'Copy File successfully.') {
      setShowImage(false);
      setShowImageText('Zeichnung öffnen');
    } else {
      setShowImage(true);
      setShowImageText('Zeichnung schließen');
    }
  };

  return (
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid',
            fontSize: '30px',
            maxWidth: 2000,
          },
        }}
      />
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
