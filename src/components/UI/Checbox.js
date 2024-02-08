import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
  transform: scale(2); /* Increase the size of the checkbox */
`;

const CheckboxLabel = styled.label`
  font-size: 20px;
  margin-left: 10px;
`;

const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;
