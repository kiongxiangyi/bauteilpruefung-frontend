/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

import Button, {
  ButtonWrapper,
  ToastContent,
} from '../../components/UI/Button';
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
  picturePath,
}) {
  const [showImageText, setShowImageText] = useState('Zeichnung öffnen');
  const [showImage, setShowImage] = useState(false);

  const handleClickOpenImage = () => {
    if (picturePath === 'No path is found.') {
      toast(
        (t) => (
          <ToastContent>
            Es gibt keinen Pfad der Zeichnung.
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
        ),
        {
          duration: Infinity, //duration of toast appearance forever
        }
      );
    } else if (picturePath === 'No such file or directory.') {
      toast(
        (t) => (
          <ToastContent>
            Der angegebene Pfad der Zeichnung ist nicht vorhanden.
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
        ),
        {
          duration: Infinity, //duration of toast appearance forever
        }
      );
    } else if (showImage) {
      setShowImage(false);
      setShowImageText('Zeichnung öffnen');
    } else {
      //show image when click on the button
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
      {showImage && (
        <ImageModal
          imageUrl={`./pictures/${auftragPruefpositionen[0].Pruefplannummer}.jpg`}
        />
      )}
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
