/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

import TableAuftragPruefdaten from '../../components/Table/TableAuftragPruefdaten';
import { TableDiv } from '../../components/UI/Table';
import Button from '../../components/UI/Button';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 0 0;
`;

export default function Finalpage({ auftragPruefdaten, handleClickHomepage }) {
  return (
    <>
      <TableDiv>
        <TableAuftragPruefdaten auftragPruefdaten={auftragPruefdaten} />
      </TableDiv>
      <Div>
        <Button onClick={handleClickHomepage}>Schließen</Button>
      </Div>
    </>
  );
}
