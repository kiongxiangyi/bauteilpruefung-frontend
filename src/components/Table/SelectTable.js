import React from "react";
import styled from "styled-components";
import Select from "react-select";

export default function SelectTable() {
  const Table = styled.table`
    border: 2px solid #999999;
    text-align: center;
    margin: 10px;
    vertical-align: middle;
  `;

  const Th = styled.th`
    border: 1px solid;
  `;

  const Td = styled.td`
    border: 1px solid;
  `;

  const options = [
    { value: "Wert IO", label: "Wert IO" },
    { value: "Wert nicht IO", label: "Wert nicht IO" },
  ];

  return (
    <Table className="table">
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
