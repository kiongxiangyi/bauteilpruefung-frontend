import React from 'react';

import { Table, Td, Th, Tr, Thead } from '../UI/Table';
import SelectRow from './SelectRow';
import { NumberInput } from '../UI/NumberInput';
import TextInput from '../UI/TextInput';

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
        {auftragPruefpositionen.map((item) => (
          <Tr key={item.ID}>
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
                <NumberInput
                  name="value"
                  step="0.01"
                  onChange={(event) =>
                    handleInputChange(item.ID, item.KeineWerteingabe, event)
                  }
                ></NumberInput>
              )}
            </Td>
            <Td>
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
