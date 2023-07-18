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

export default function Results({ auftragPruefpositionen, handleSubmit }) {
  const [result, setResult] = useState([]);

  console.log(result);

  return (
    <form onSubmit={handleSubmit}>
      <TableDiv>
        <TableAuftragPruefpositionen
          auftragPruefpositionen={auftragPruefpositionen}
          setResult={setResult}
          result={result}
        />
      </TableDiv>
      <Div>
        <Button>Speichern</Button>
      </Div>
    </form>
  );
}
