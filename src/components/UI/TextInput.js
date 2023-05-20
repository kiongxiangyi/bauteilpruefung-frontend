import React, { useId } from "react";
import "./UI.css";

export default function TextInput({ ...props }) {
  // useId hook make sures that every TextInput in your application will have a different ID
  const id = useId();

  return <input className="textInput" type="text" id={id} {...props} />;
}
