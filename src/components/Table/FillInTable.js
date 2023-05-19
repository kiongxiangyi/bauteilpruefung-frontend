import React from "react";
import styled from "styled-components";

export default function FillInTable() {
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

  return (
    <Table className="table">
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
