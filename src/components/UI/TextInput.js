import React, { useId } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 48px;
  font-size: 30px;
`;

export default function TextInput({ ...props }) {
  // useId hook make sures that every TextInput in your application will have a different ID
  const id = useId();

  return <Input type="text" id={id} {...props} />;
}
