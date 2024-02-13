import React from 'react';
import styled from 'styled-components';

//Tutorial: A single button component should be able to handle all types of button
//https://codesandbox.io/s/jwc-button-exercise-solution-4dbpw?file=/src/Button.js

const Button = ({ size, children, onClick, disabled = false }) => {
  let Component;
  if (size === 'small') {
    Component = SmallButton;
  } else if (size === 'medium') {
    Component = MediumButton;
  } else if (size === 'big') {
    Component = BigButton;
  } else {
    throw new Error(`Unrecognized Button size: ${size}`);
  }

  return (
    <Component onClick={onClick} disabled={disabled}>
      {children}
    </Component>
  );
};

const ButtonBase = styled.button`
  background-color: #e7e7e7;
  color: black;
  margin: 0.5rem 0.5rem;
  font-size: 30px;
  border: 2px solid;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;

  &:hover {
    background-color: lightgray;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    border: 2px solid #aaa;
    cursor: not-allowed;
  }
`;

const SmallButton = styled(ButtonBase)`
  width: 200px;
`;
const MediumButton = styled(ButtonBase)`
  width: 400px;
`;

const BigButton = styled(ButtonBase)`
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  color: black;
  font-size: 2.5rem;
  letter-spacing: 0.15rem;
  height: 10rem;
  width: 30rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

export const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem;
  margin: 5rem;
`;

export default Button;
