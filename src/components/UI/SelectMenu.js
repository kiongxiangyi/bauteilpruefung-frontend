/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// @ts-ignore
import Select from 'react-select';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function SelectMenu({ ...props }) {
  return (
    <Div>
      <Select
        styles={{
          container: (base) => ({
            ...base,
            width: '32.5rem',
          }),
        }}
        getOptionValue
        isSearchable
        {...props}
      />
    </Div>
  );
}
