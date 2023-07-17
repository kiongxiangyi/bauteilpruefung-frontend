import React from 'react';
import styled from 'styled-components';

import { Table, Td, Th } from '../UI/Table';

export default function FillInTable() {
  const Thead = styled.thead`
    color: black;
    background: #ffe100;
    vertical-align: middle;
  `;

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Position</Th>
          <Th>Artikel</Th>
          <Th>Bezeichnung</Th>
          <Th>Minwert</Th>
          <Th>Maxwert</Th>
          <Th>Sollwert</Th>
          <Th>Ergebnis</Th>
          <Th>Bemerkung</Th>
        </tr>
      </Thead>
      <tbody>
        <tr>
          <Td>1</Td>
          <Td>0001</Td>
          <Td>Description...</Td>
          <Td>min</Td>
          <Td>max</Td>
          <Td>soll</Td>
          <Td>
            <input></input>
          </Td>
          <Td>
            <input></input>
          </Td>
        </tr>
      </tbody>
    </Table>
  );
}
