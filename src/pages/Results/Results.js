/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/UI/Button';
import TableAuftragPruefpositionen from '../../components/Table/TableAuftragPruefpositionen';
import { TableDiv } from '../../components/UI/Table';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 0 0;
`;

export default function Results({
  auftragPruefpositionen,
  handleSubmit,
  setResult,
  result,
  handleInputChange,
  handleClickPreviousPage,
}) {
  return (
    <>
      <TableDiv>
        <TableAuftragPruefpositionen
          auftragPruefpositionen={auftragPruefpositionen}
          setResult={setResult}
          result={result}
          handleInputChange={handleInputChange}
        />
      </TableDiv>
      <Div>
        <Button onClick={handleClickPreviousPage}>Zurück</Button>
        <Button onClick={handleSubmit}>Speichern</Button>
      </Div>
    </>
  );
}
