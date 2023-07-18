import React from 'react';

import { Table, Td, Th, Tr, Thead } from '../UI/Table';

export default function TableAuftragPruefdaten({ auftragPruefdaten }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Td>Pruefplannummer</Td>
          <Th>Position</Th>
          <Th>Bezeichnung</Th>
          <Th>Istwert</Th>
          <Th>WertIO</Th>
        </Tr>
      </Thead>
      <tbody>
        {auftragPruefdaten.map((item, i) => (
          <Tr key={i}>
            <Td>{item.Pruefplannummer}</Td>
            <Td>{item.Position}</Td>
            <Td>{item.Bezeichnung}</Td>
            <Td>{item.Istwert}</Td>
            <Td>{item.WertIO}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
