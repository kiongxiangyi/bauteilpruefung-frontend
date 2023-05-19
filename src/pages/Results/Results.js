import React from "react";
import Header from "../../components/Header/Header.js";
import Button from "../../components/UI/Button";
import SelectTable from "../../components/Table/SelectTable";
import FillInTable from "../../components/Table/FillInTable";

export default function Results() {
  const handleClick = () => {
    console.log("Button was clicked!");
  };

  let KeineWerteingabe = true;

  return (
    <>
      <Header />
      {KeineWerteingabe === false ? <SelectTable /> : <FillInTable />}
      <Button onClick={handleClick}>Save</Button>
    </>
  );
}
