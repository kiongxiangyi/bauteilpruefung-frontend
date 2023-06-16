/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import Button from '../../components/UI/Button';
import SelectTable from '../../components/Table/SelectTable';
import FillInTable from '../../components/Table/FillInTable';

const TableDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 0 0;
  padding: 10px;
  font-size: 30px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 0 0;
`;

export default function Results({ auftragPruefpositionen }) {
  // Renaming handleClick to handleSave
  const handleSave = () => {
    console.log('Button was clicked!');
  };

  let KeineWerteingabe = true;

  return (
    <>
      <TableDiv>
        {KeineWerteingabe === false ? <SelectTable /> : <FillInTable />}
      </TableDiv>
      <Div>
        <Button onClick={handleSave}>Save</Button>
      </Div>
    </>
  );
}
