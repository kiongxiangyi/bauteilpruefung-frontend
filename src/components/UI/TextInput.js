import React from "react";
import "./UI.css";

export default function TextInput() {
  return (
    <div className="bauteilnummer">
      <h1>Bauteilnummer:</h1>
      <input
        className="textInput"
        autoFocus
        type="text"
        id="bauteilnummer"
        name="bauteilnummer"
        //size="35"
        pattern="[0-9]+"
        //value=""
        //onChange={(e) => setBauteilnummer(e.target.value)}
      />
    </div>
  );
}
