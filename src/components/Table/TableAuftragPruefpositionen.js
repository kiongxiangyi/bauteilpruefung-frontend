import React from 'react';
import styled from 'styled-components';

import { Table, Td, Th, Tr, Thead } from '../UI/Table';
import SelectRow from './SelectRow';

const Input = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 2rem;
  //input without an arrow
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export default function TableAuftragPruefpositionen({
  auftragPruefpositionen,
  handleInputChange,
}) {
  /* //Handling Text Field with Decimal and Numbers Only
  handleChange = (event) => {
    const { value } = event.target;
    const validValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(validValue)) {
    }
    this.setState({ value: validValue });
  }
  render() {
    return <input type="text" value={this.state.value} onChange={this.handleChange} />;
  }
   */

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Prüfplannummer</Th>
          <Th>Position</Th>
          <Th>Bezeichnung</Th>
          <Th>Ergebnis</Th>
          <Th>Bemerkung</Th>
        </Tr>
      </Thead>
      <tbody>
        {auftragPruefpositionen.map((item, i) => (
          <Tr key={i}>
            <Td>{item.Pruefplannummer}</Td>
            <Td>{item.Position}</Td>
            <Td>{item.Bezeichnung}</Td>
            <Td>
              {item.KeineWerteingabe === true ? (
                <SelectRow
                  onChange={(event) =>
                    handleInputChange(item.ID, item.KeineWerteingabe, event)
                  }
                />
              ) : (
                <Input
                  type="number"
                  pattern="[0-9]*"
                  step="0.01"
                  onChange={(event) =>
                    handleInputChange(item.ID, item.KeineWerteingabe, event)
                  }
                ></Input>
              )}
            </Td>
            <Td>
              <Input
                type="text"
                onChange={(event) =>
                  handleInputChange(item.ID, item.KeineWerteingabe, event)
                }
              ></Input>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
