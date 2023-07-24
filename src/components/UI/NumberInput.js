import React, { useId } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 5px;
  height: 48px;
  width: 100%;
  font-size: 30px;
  text-align: center;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const InputSmall = styled(Input)`
  width: 520px;
  height: 38px;
`;

export function NumberInput({ ...props }) {
  // useId hook make sures that every TextInput in your application will have a different ID
  const id = useId();

  return <Input type="number" pattern="[0-9]+" id={id} {...props} />;
}

export function NumberInputSmall({ ...props }) {
  // useId hook make sures that every TextInput in your application will have a different ID
  const id = useId();

  return <InputSmall type="number" pattern="[0-9]+" id={id} {...props} />;
}
