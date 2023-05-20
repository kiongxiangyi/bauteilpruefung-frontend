import React from "react";
import "./UI.css";

{
  /* Button should only provide the button and nothing else */
}
const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
