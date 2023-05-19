import React from "react";
import Header from "../../components/Header/Header.js";
import Select from "react-select";
import styled from "styled-components";

export default function Results() {
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
    <div>
      <Header />
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
    </div>
  );
}
