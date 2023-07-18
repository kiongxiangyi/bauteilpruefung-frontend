import React from 'react';
import styled from 'styled-components';

import { Table, Td, Th, Tr, Thead } from '../UI/Table';
import SelectRow from './SelectRow';

const Input = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 2rem;
`;

export default function TableAuftragPruefpositionen({
  auftragPruefpositionen,
  setResult,
  result,
}) {
  console.log(result);

  //save the input value according to name(Bezeichnung) of each row
  const updateResult = (value, name) => {
    setResult({
      ...result,
      [name]: value,
    });
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Position</Th>
          <Th>Bezeichnung</Th>
          <Th>Ergebnis</Th>
          <Th>Bemerkung</Th>
        </Tr>
      </Thead>
      <tbody>
        {auftragPruefpositionen.map((item, i) => (
          <Tr key={i}>
            <Td>{item.Position}</Td>
            <Td>{item.Bezeichnung}</Td>
            <Td>
              {item.KeineWerteingabe === true ? (
                <SelectRow
                  onChange={(options) =>
                    updateResult(options.value, item.Bezeichnung)
                  }
                />
              ) : (
                <Input
                  name={item.Bezeichnung}
                  type="text"
                  onChange={(e) => updateResult(e.target.value, e.target.name)}
                ></Input>
              )}
            </Td>
            <Td>
              <Input></Input>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
