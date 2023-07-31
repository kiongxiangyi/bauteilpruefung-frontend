import React, { useState } from 'react';
import styled from 'styled-components';

const Thumbnail = styled.img`
  width: 20%;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1; //react select is blocking the image, with z-index let the image show on top
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const DivImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const ImageModal = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <DivImage>
      <Thumbnail src={imageUrl} onClick={handleClick} alt="thumbnail" />

      {isOpen && (
        <Modal onClick={handleClick}>
          <ModalImage src={imageUrl} alt="enlarged" />
        </Modal>
      )}
    </DivImage>
  );
};

export default ImageModal;
