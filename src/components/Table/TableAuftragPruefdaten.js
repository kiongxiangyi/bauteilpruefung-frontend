import React from 'react';

import { Table, Td, Th, Tr, Thead } from '../UI/Table';

export default function TableAuftragPruefdaten({ auftragPruefdaten }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Prüfplannummer</Th>
          <Th>Bauteilnummer</Th>
          <Th>Position</Th>
          <Th>Bezeichnung</Th>
          <Th>Istwert</Th>
          <Th>WertIO</Th>
          <Th>Bemerkung</Th>
        </Tr>
      </Thead>
      <tbody>
        {auftragPruefdaten.map((item, i) => (
          <Tr key={i}>
            <Td>{item.Pruefplannummer}</Td>
            <Td>{item.Bauteilnummer}</Td>
            <Td>{item.Position}</Td>
            <Td>{item.Artikel}</Td>
            <Td>{item.Istwert}</Td>
            <Td>{item.WertIO === true ? 'Wert IO' : 'Wert nicht IO'}</Td>
            <Td>{item.Bemerkung}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
