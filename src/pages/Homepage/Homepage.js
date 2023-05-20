import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectMenu from "../../components/UI/SelectMenu";
import TextInput from "../../components/UI/TextInput";
import Button from "../../components/UI/Button";

export default function Homepage() {
  const [value, setValue] = useState("");
  /* const handleClick = () => {
    console.log("Button was clicked!");
  }; */
  const navigate = useNavigate(); //hook for navigation

  function handleSearch() {
    console.log({ value });
    // Perform the logic of calling the API with appropriate data
    // If results is successful then navigate to /results route
    navigate("/results");
  }

  return (
    <div>
      <SelectMenu />
      {/* The TextInput should only provide input box and nothing else, otherwise it would become less reusable */}
      <div className="bauteilnummer">
        <h1>Bauteilnummer:</h1>
        <TextInput
          autoFocus
          name="bauteilnummer"
          pattern="[0-9]+"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      {/* Centering the button should be responsibility of the parent component */}
      {/* Button should only provide the button and nothing else */}
      <div className="flex">
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}
