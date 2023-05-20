import React from 'react';
import Select from 'react-select';

import { Table, Th, Td } from '../UI/Table';

// The styled components declaration should be outside of the main component

export default function SelectTable() {
  const options = [
    { value: 'Wert IO', label: 'Wert IO' },
    { value: 'Wert nicht IO', label: 'Wert nicht IO' },
  ];

  return (
    <Table>
      <thead>
        <tr>
          <Th>Position</Th>
          <Th>Artikel</Th>
          <Th>Bezeichnung</Th>
          <Th>Ergebnis</Th>
          <Th>Bemerkung</Th>
        </tr>
      </thead>
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
