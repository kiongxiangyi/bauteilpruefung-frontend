import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { Table, Th, Td } from '../UI/Table';

// The styled components declaration should be outside of the main component

export default function SelectTable() {
  const Thead = styled.thead`
    color: black;
    background: #ffe100;
    vertical-align: middle;
  `;

  const options = [
    { value: 'Wert IO', label: 'Wert IO' },
    { value: 'Wert nicht IO', label: 'Wert nicht IO' },
  ];

  return (
    <Table>
      <Thead>
        <tr>
          <Th>Position</Th>
          <Th>Artikel</Th>
          <Th>Bezeichnung</Th>
          <Th>Ergebnis</Th>
          <Th>Bemerkung</Th>
        </tr>
      </Thead>
      <tbody>
        <tr>
          <Td>1</Td>
          <Td>0001</Td>
          <Td>Description...</Td>
          <Td>
            <Select options={options} />
          </Td>
          <Td>
            <input></input>
          </Td>
        </tr>
      </tbody>
    </Table>
  );
}
