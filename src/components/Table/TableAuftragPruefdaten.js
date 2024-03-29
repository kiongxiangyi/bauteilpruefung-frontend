import React from 'react';

import { Table, Td, Th, Tr, Thead } from '../UI/Table';

const bewertung = (item) => {
  return item.WertIO === true ? 'i.O' : 'n.i.O';
};

export default function TableAuftragPruefdaten({ auftragPruefdaten, color }) {
  return (
    <Table>
      <Thead
        red={color.HeaderRot}
        green={color.HeaderGruen}
        blue={color.HeaderBlau}
      >
        <Tr>
          <Th>Prüfplan</Th>
          <Th>Serialnr.</Th>
          <Th>Position</Th>
          <Th>Formelement</Th>
          <Th>Messmittel</Th>
          <Th>IST-Wert</Th>
          <Th>Bewertung</Th>
          <Th>Bemerkung</Th>
        </Tr>
      </Thead>
      <tbody>
        {auftragPruefdaten.map((item, i) => (
          <Tr key={i}>
            <Td bewertung={bewertung(item)}>{item.Pruefplannummer}</Td>
            <Td bewertung={bewertung(item)}>{item.Bauteilnummer}</Td>
            <Td bewertung={bewertung(item)}>{item.Position}</Td>
            <Td bewertung={bewertung(item)}>{item.Positionstext}</Td>
            <Td bewertung={bewertung(item)}>{item.Artikel}</Td>
            <Td bewertung={bewertung(item)}>{item.Istwert}</Td>
            <Td bewertung={bewertung(item)}>{bewertung(item)}</Td>
            <Td bewertung={bewertung(item)}>{item.Bemerkung}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
