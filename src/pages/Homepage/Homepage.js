import React from "react";
import Header from "../../components/Header/Header.js";
import SelectMenu from "../../components/UI/SelectMenu";
import TextInput from "../../components/UI/TextInput";
import Button from "../../components/UI/Button";


export default function Homepage() {
  return (
    <div>
      <Header />
      <SelectMenu />
      <TextInput />
      <Button />
    </div>
  );
}
