import React from 'react';

import { Table, Td, Th } from '../UI/Table';


export default function FillInTable() {
  return (
    <Table>
      <thead>
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
      </thead>
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
