import React from "react";
import "./UI.css";
import PropTypes from "prop-types";

const Button = ({ children, onClick }) => {
  //Solve error message “ ‘children’ is missing in props validation eslint(react/prop-types)” - https://forhjy.medium.com/react-solution-for-children-is-missing-in-props-validation-eslint-react-prop-types-2e11bc6043c7
  return (
    <div className="flex">
      <button className="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.node.isRequired,
};

export default Button;
