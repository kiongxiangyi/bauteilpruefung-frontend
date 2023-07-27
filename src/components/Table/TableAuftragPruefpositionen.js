import React from 'react';

import { Table, Td, Th, Tr, Thead } from '../UI/Table';
import SelectRow from './SelectRow';
import { NumberInput } from '../UI/NumberInput';
import TextInput from '../UI/TextInput';

export default function TableAuftragPruefpositionen({
  auftragPruefpositionen,
  handleInputChange,
}) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Prüfplannummer</Th>
          <Th>Pos.</Th>
          <Th>Prüfmerkmal</Th>
          <Th>Messmittel</Th>
          <Th>Min-Wert</Th>
          <Th>Max-Wert</Th>
          <Th>Soll-Wert</Th>
          <Th>IST-Wert</Th>
          <Th>Bewertung</Th>
          <Th>Bemerkung</Th>
        </Tr>
      </Thead>
      <tbody>
        {auftragPruefpositionen.map((item) => (
          <Tr key={item.ID}>
            <Td bewertung={item.bewertung}>{item.Pruefplannummer}</Td>
            <Td bewertung={item.bewertung}>{item.Position}</Td>
            <Td bewertung={item.bewertung}>{item.Bezeichnung}</Td>
            <Td bewertung={item.bewertung}>{item.Zusatztext1}</Td>
            <Td bewertung={item.bewertung}>{item.MinWert}</Td>
            <Td bewertung={item.bewertung}>{item.MaxWert}</Td>
            <Td bewertung={item.bewertung}>{item.Sollwert}</Td>
            <Td bewertung={item.bewertung}>
              {item.KeineWerteingabe === true ? (
                <SelectRow
                  onChange={(event) => {
                    handleInputChange(item.ID, item.KeineWerteingabe, event);
                  }}
                />
              ) : (
                <NumberInput
                  name="value"
                  step="0.001"
                  min="0"
                  onChange={(event) => {
                    handleInputChange(
                      item.ID,
                      item.KeineWerteingabe,
                      event,
                      item.MinWert,
                      item.MaxWert
                    );
                  }}
                ></NumberInput>
              )}
            </Td>
            <Td bewertung={item.bewertung}>{item.bewertung}</Td>
            <Td bewertung={item.bewertung}>
              <TextInput
                name="bemerkung"
                type="text"
                onChange={(event) =>
                  handleInputChange(item.ID, item.KeineWerteingabe, event)
                }
              ></TextInput>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
