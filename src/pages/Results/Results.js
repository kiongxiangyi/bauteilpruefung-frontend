import React from "react";
import Button from "../../components/UI/Button";
import SelectTable from "../../components/Table/SelectTable";
import FillInTable from "../../components/Table/FillInTable";

export default function Results() {
  // Renaming handleClick to handleSave
  const handleSave = () => {
    console.log("Button was clicked!");
  };

  let KeineWerteingabe = true;

  return (
    <>
      {KeineWerteingabe === false ? <SelectTable /> : <FillInTable />}
      <Button onClick={handleSave}>Save</Button>
    </>
  );
}
