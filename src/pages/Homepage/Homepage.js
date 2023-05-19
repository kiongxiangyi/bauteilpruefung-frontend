import React from "react";
import Header from "../../components/Header/Header.js";
import SelectMenu from "../../components/UI/SelectMenu";
import TextInput from "../../components/UI/TextInput";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  /* const handleClick = () => {
    console.log("Button was clicked!");
  }; */
  const navigate = useNavigate(); //hook for navigation

  return (
    <div>
      <Header />
      <SelectMenu />
      <TextInput />
      <Button onClick={() => navigate("/Results")}>Search</Button>
    </div>
  );
}
